import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  XIcon,
} from '@heroicons/react/outline';
import { VolumeUpIcon } from '@heroicons/react/solid';
import MuiModal from '@mui/material/Modal';

import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { Element, Genre, Movie } from '../typings';
import axios from 'axios';
import WebtorPlayer from './WebtorPlayer';



interface Props {
  movie: Movie | DocumentData
}

// Function to convert TMDB ID to IMDb ID
async function convertTmdbToImdb(tmdbId: any) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/external_ids`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    const imdbId = response.data.imdb_id;
    return imdbId || null; // Return null if IMDb ID is not available
  } catch (error) {
    console.error('Error converting TMDB ID to IMDb ID:', (error as Error).message);
    return null;
  }
}


async function getTorrentsByImdbId(imdbId: string) {
  try {
    const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${imdbId}`);
    const movies = response.data?.data?.movies || [];

    if (movies.length > 0) {
      const torrentLinks = movies[0].torrents || [];

      // Sort torrents by seeds in descending order
      torrentLinks.sort((a: { seeds: number }, b: { seeds: number }) => b.seeds - a.seeds);

      // Filter and return the top two quality torrents
      const topTwoTorrents = torrentLinks.slice(0, 1).map((torrent: { hash: string; quality: string }) => {
        return { hash: torrent.hash, quality: torrent.quality };
      });

      return topTwoTorrents;
    }
  } catch (error: unknown) {
    console.error('Error fetching torrents:', (error as Error).message);
  }

  return [];
}



function Modal() {
  const [torrents, setTorrents] = useState<Array<{ hash: string; quality: string }>>([]);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const { user } = useAuth();
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const [selectedTorrent, setSelectedTorrent] = useState<string | null>(null);
 


  const axios = require('axios');

  useEffect(() => {
    if (!movie) return;

    const convertTmdbIdToImdbId = async () => {
      try {
        const imdbId = await convertTmdbToImdb(movie?.id);
        console.log('IMDb ID:', imdbId);

        if (imdbId) {
          const torrents = await getTorrentsByImdbId(imdbId);
          console.log('Torrents:', torrents);
          setTorrents(torrents);
        }
      } catch (error: unknown) {
        console.error('Error:', (error as Error).message);
      }
    };


    // Call the function to convert the TMDB ID to IMDb ID
    convertTmdbIdToImdbId();
  }, [movie]);

  const toastStyle = {
    background: 'white',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  }

  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs)
      )
    }
  }, [db, movie?.id])

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  )

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
      )

      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
        { ...movie }
      )

      toast(
        `${movie?.title || movie?.original_name} has been added to My List`,
        {
          duration: 8000,
          style: toastStyle,
        }
      )
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }

  console.log(trailer)

  const handleTorrentClick = (hash: string) => {
    setSelectedTorrent(hash);
    setShowModal(false);
  };
  
  
  

  

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixex !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <Toaster position="bottom-center" />
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
        {trailer ? (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${trailer}`}
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: '0', left: '0' }}
      playing
      muted={muted}
    />
  ) : (
    <ReactPlayer
      url="https://youtu.be/xeT-USb9vKY"
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: '0', left: '0' }}
      playing
      muted={muted}
    />
  )}
 

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              {/* <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button> */}

              {/* Display the torrent buttons */}
              {torrents.length > 0 && (
            <div className="mt-0">
              {torrents.map((torrent, index) => (
                <button
                key={index}
                className="inline-flex items-center gap-x-1 mr-2 rounded bg-white px-3 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                onClick={() => setSelectedTorrent(torrent.hash)}
              >
                Watch Now 
                <FaPlay className="h-4 w-4 text-black" />
              </button>
              
              ))}
            </div>
          )}



              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>

              {/* <button className="modalButton">
                <ThumbUpIcon className="h-7 w-7" />
              </button> */}

            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {showModal && selectedTorrent && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
    <div className="relative bg-[#151515] rounded-lg shadow-lg px-0 py-12 w-full sm:w-11/12">
      <button
        className="absolute top-2 right-2 text-white hover:text-gray-300 focus:text-gray-300"
        onClick={() => {
          setSelectedTorrent(null);
          setShowModal(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 bg-[#2d2d2d] rounded-2xl p-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="text-center text-white">
        <WebtorPlayer
          torrentHash={selectedTorrent}
          title={movie?.title}
          backdrop={movie?.backdrop_path}
          
        />
        <div className="text-sm pt-5">Please be patient while the movie loads.</div>
      </div>
    </div>
  </div>
)}


        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
              {(movie!.vote_average * 10).toFixed(2)}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
                
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD 
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
            
              <p className="w-5/6">
              <div className="font-bold uppercase">{movie?.title}</div>
                {movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>


 


                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
