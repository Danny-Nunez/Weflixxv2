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
import VideoPlayer from './VideoPlayer';





interface Props {
  movie: Movie | DocumentData
}

interface MovieInfo {
  data?: Data;
}

interface MovieInfoData {
  description?: string;
  quality?: string; // Assuming quality is a string
}
interface Episode {
  season: number;
  id: string;
  title: string;
  still_path: string;
}

interface Data {
  description?: string;
  quality?: string;
  releaseDate?: string;
  genres?: string[];
  duration?: string;
  casts?: string[];
}


function Modal({ openModal, closeModal }: { openModal: () => void, closeModal: () => void }) {
  const [episodeId, setEpisodeId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const { user } = useAuth();
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const [movieInfo, setMovieInfo] = useState<MovieInfo>({});
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [latestSeason, setLatestSeason] = useState<number>(0);
  const [episodeTitle, setEpisodeTitle] = useState<string>('');
  const [stillPath, setStillPath] = useState<string>('');
  const [episodeOverview, setEpisodeOverview] = useState<string>(''); // Add this line at the beginning of the component
  const axios = require('axios');


  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const movieInfoResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}info?mediaId=${movie?.id}`
        );
        setMovieInfo(movieInfoResponse.data);
  
        if (
          movieInfoResponse.data?.data?.episodes &&
          movieInfoResponse.data.data.episodes.length > 0
        ) {
          setEpisodes(movieInfoResponse.data.data.episodes); // Store all episodes
  
          // Set the first episode's ID
          const firstEpisodeId = movieInfoResponse.data.data.episodes[0].id;
          setEpisodeId(firstEpisodeId);
          console.log('Episode ID:', firstEpisodeId); // Log the episode ID
  
          // Find the latest season
          const latestSeasonNumber = Math.max(
            ...movieInfoResponse.data.data.episodes.map(
              (episode: Episode) => episode.season
            )
          );
          setLatestSeason(latestSeasonNumber);
  
          // Set the selected season to the latest season on load
          setSelectedSeason(latestSeasonNumber);
        }
      } catch (error) {
        console.error('Error fetching movie info:', error);
      }
    };
  
    fetchMovieInfo();
  }, [movie]);
  
  
  
  const handleSeasonSelect = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    toggleDropdown();
  }  

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
    const fetchMovieIdAndDetails = async () => {
      let searchEndpoint = '';
      if (movie?.type === 'tv-show') {
        searchEndpoint = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(
          movie?.title
        )}`;
      } else {
        searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(
          movie?.title
        )}`;
      }
  
      const searchData = await fetch(searchEndpoint)
        .then((response) => response.json())
        .catch((err) => console.log(err.message));
  
      if (searchData.results.length > 0) {
        const movieId = searchData.results[0].id;
        console.log('Movie ID:', movieId); // Log the movie ID
  
        const fetchSeasonData = async () => {
          if (movieId && selectedSeason) {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${movieId}/season/${selectedSeason}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
              );
              const { episodes } = response.data;
        
              const updatedEpisodes = episodes.map((episode: { still_path: string }) => {
                const { still_path } = episode;
                const imageUrl = still_path
                  ? `https://image.tmdb.org/t/p/w500/${still_path}`
                  : '';
                return {
                  ...episode,
                  still_path: imageUrl,
                };
              });
        
              const episode = episodes[0]; // Assuming you want the first episode
              const { title, overview} = episode;
        
              // setEpisodes(updatedEpisodes);
              setEpisodeOverview(overview); // Update the episode overview
              setStillPath(updatedEpisodes[0].still_path);
              setEpisodeTitle(title);
        
              console.log('Episodes:', updatedEpisodes);
              console.log('Image URL:', updatedEpisodes[0].still_path);
            } catch (error) {
              console.error('Error fetching still path:', error);
            }
          }
        };
        
        
        fetchSeasonData();
        
        
  
        const fetchTrailer = async () => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/${movie?.type === 'tv-show' ? 'tv' : 'movie'}/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
            );
            const data = await response.json();
  
            if (data?.results) {
              const trailer = data.results.find((video: { type: string }) => video.type === 'Trailer');
              if (trailer) {
                setTrailer(trailer.key);
              }
            }
            
          } catch (error) {
            console.error('Error fetching trailer:', error);
          }
        };
  
        fetchTrailer();
      }
    };
  
    fetchMovieIdAndDetails();
  }, [movie, selectedSeason]);
    

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [db, movie?.id]);

  // Check if the movie is already in the user's list
  useEffect(() => {
    setAddedToList(
      movies.findIndex((result) => result.id === movie?.id) !== -1
    );
  }, [movies]);

  const handleList = async () => {
    if (!movie?.id) {
      console.error("Movie ID is empty");
      return;
    }
  
    const movieId = movie?.id.toString();
    const lastIndex = movieId.lastIndexOf('/');
    const movieIdSubstring = lastIndex !== -1 ? movieId.substring(lastIndex + 1) : '';
  
    if (addedToList) {
      await deleteDoc(
        doc(db, 'customers', user!.uid, 'myList', movieIdSubstring)
      );
  
      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 8000,
          style: {
            background: 'white',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '15px',
            borderRadius: '9999px',
            maxWidth: '1000px',
          },
        }
      );
    } else {
      await setDoc(
        doc(db, 'customers', user!.uid, 'myList', movieIdSubstring),
        { ...movie }
      );
  
      toast(
        `${movie?.title || movie?.original_name} has been added to My List`,
        {
          duration: 8000,
          style: {
            background: 'white',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '15px',
            borderRadius: '9999px',
            maxWidth: '1000px',
          },
        }
      );
    }
  };
  
  const handleClose = () => {
  
    setShowModal(false);
  };

  // console.log(trailer)

  
  const handlePlay = (selectedEpisodeId: string) => {
    const selectedEpisode = episodes.find((episode) => episode.id === selectedEpisodeId);
    const episodeTitle = selectedEpisode?.title || '';
  
    setShowPopup(true); // Show the popup
    if (movie?.type === 'movie') {
      // Set episodeId to the first episode ID for movies
      const firstEpisodeId = episodes[0]?.id || '';
      setEpisodeId(firstEpisodeId);
    } else {
      setEpisodeId(selectedEpisodeId); // Set the selected episode ID for TV shows
    }
    setEpisodeTitle(episodeTitle); // Pass the episode title to the VideoPlayer component
  };
  
  
  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };
  
  const toggleDropdown = () => {
    const dropdownMenu = document.getElementById('dropdown');
    dropdownMenu?.classList.toggle('hidden');
  };
  

  const getSeasonEpisodeCount = (seasonNumber: number) => {
    return episodes.filter((episode) => episode.season === seasonNumber).length;
  };  

  useEffect(() => {
    const body = document.body;
    if (showPopup) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }
  }, [showPopup]);
  

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
            {movie?.type === 'movie' && (
            <button
            className="flex items-center gap-x-2 rounded bg-white px-3 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
            onClick={() => episodeId && handlePlay(episodeId)}
          >
            Watch Now<FaPlay className="h-5 w-5 text-black" />
          </button>
          
          
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

        {showPopup && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-100"></div>
    <div className="relative bg-[#000000] border-red-900 border rounded-lg shadow-lg px-0 py-12 w-full sm:w-11/12">
      <button onClick={closePopup} className="absolute top-2 right-2 text-white hover:text-gray-300 focus:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 bg-[#2d2d2d] rounded-2xl p-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="text-center text-white">
        <VideoPlayer
          movieId={movie?.id} // Pass the movie ID
          episodeId={episodeId || ''} // Pass the episode ID or use an empty string as a fallback
          title={movie?.title}
          episodeTitle={episodeTitle} // Pass the episode title
        />
      </div>
    </div>
  </div>
)}


        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p>Release Date: <span className="font-semibold text-green-400">
              {/* {(movie!.vote_average * 10).toFixed(2)}% Match */}
               {movieInfo?.data?.releaseDate}
              </span></p>
              <p className="font-light pr-6">
                {movie?.release_date || movie?.first_air_date}
                
              </p>
               Quality:<div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
              {movieInfo?.data?.quality}
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
            
              <p className="w-5/6">
              <div className="font-bold uppercase">{movie?.title}</div>
            <div className="text-sm">{movie?.overview} {movieInfo?.data?.description}</div></p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')} {movieInfo?.data?.genres?.join(', ')}
                </div>


                <div>
                  <span className="text-[gray]">Duration: </span>
                  {movieInfo?.data?.duration}
                </div>

                <div>
                  <span className="text-[gray]">Cast: </span>
                  {movieInfo?.data?.casts?.join(', ')}
                </div>
                
              </div>
              
            </div>


            {movie?.type === 'tv-show' && (
              
  <>
    {/* Dropdown menu for seasons */}
    <div className="flex items-center justify-between">
    <div className="hidden sm:block md:block">
              
              {stillPath && (
                <img
                src={`https://www.themoviedb.org/t/p/original/${stillPath}`}
                alt="Still Path"
                className="mt-4 pr-4 h-42 rounded object-cover"
              />
              )}
            </div>
            <div>
      <div className="text-sm w-4/5 pr-8 hidden sm:block">
      <p className="text-lg font-semibold">Season {selectedSeason}</p>
      {episodeOverview}</div> 
    </div>
 
  <div className="relative inline-block">
    <button
      id="dropdownDefaultButton"
      className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-0 focus:outline-none font-medium rounded-md text-md px-4 py-1.5 text-center inline-flex items-center border border-gray-600 mr-8 w-36"
      onClick={toggleDropdown}
      type="button"
    >
      Season {selectedSeason}
      <svg
        className="w-4 h-4 ml-2"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    {/* Dropdown menu */}
    <div
      id="dropdown"
      className="absolute z-999 hidden bg-gray-800 divide-y divide-gray-100 rounded-md shadow w-52 border border-gray-600 mt-0"
    >
      <ul className="py-0 text-md">
        {Array.from(new Set(episodes.map((episode) => episode.season)))
          .sort((a, b) => b - a)
          .map((season) => (
            <li key={season}>
              <button
                onClick={() => handleSeasonSelect(season)}
                className="text-left block px-4 w-52 py-2 hover:bg-gray-700"
              >
                Season {season} <span className="text-xs pl-2">({getSeasonEpisodeCount(season)} Episodes)</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  </div>
</div>


<div className="line-div w-full h-px  bg-gray-600"></div>



{episodes
  .filter((episode) => episode.season === selectedSeason)
  .map((episode) => {
    console.log('Episode Still Path:', episode.still_path); // Log the still_path

    return (
      <li key={episode.id} className="flex items-center space-x-4">
        <button className="text-sm pb-1 pt-1 hover:bg-gray-800 rounded pl-3 pr-10 w-auto" onClick={() => handlePlay(episode.id)}><img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg/1024px-YouTube_play_button_icon_%282013%E2%80%932017%29.svg.png`} alt="Still Path" className="mt-0 pr-3 w-8 h-auto inline relative" />{episode.title}</button>
      </li>
    );
  })}


  </>
)}



          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;