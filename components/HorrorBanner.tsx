import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Movie {
  id: string;
  image: string;
  title: string;
  description: string;
  detail: {
    quality: string;
    duration: string;
    imdb: string;
    genres: string[];
  };
}

function HorrorBanner() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        const data = await response.json();

        const slider = data.data.slider;

        // Filter movies by genre
        const actionMovies = slider.filter((movie: Movie) => movie.detail?.genres.includes("Horror") || movie.detail?.genres.includes("Thriller"));


        // If there are action movies available, select a random one
        if (actionMovies.length > 0) {
          const selectedMovie = actionMovies[Math.floor(Math.random() * actionMovies.length)];
          setMovie(selectedMovie);
        } else {
          // If no action movies are available, set the movie to null
          setMovie(null);
        }
      } catch (error) {
        console.error('Error fetching movies data:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleMoreInfoClick = async () => {
    setLoading(true); // set loading to true
    if (movie?.title) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_URL}${movie.title}`);
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
          const movieWithId = data.results[0];
          setCurrentMovie(movieWithId);
        }
      } catch (error) {
        // console.error('Error fetching movie details:', error);
      }
    }
    setShowModal(true);
    setLoading(false); // set loading to false
  }

  if (!movie) { // if movie data has not been fetched yet
    return <div>Loading...</div>; // show a loading message
  }

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={movie?.image}
          layout="fill"
          objectFit="cover"
          onLoad={() => console.log('Image loaded')} // handle image load event
          onError={() => console.log('Image error')} // handle image error event
        />
      </div>

      <h1 className="text-2xl font-bold md:text-3xl lg:text-6xl">
        {movie?.title}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-l">
        {movie?.description}
      </p>

      <div className="flex space-x-3">
        <button
          className="bannerButton bg-[gray]/70"
          onClick={handleMoreInfoClick}
          disabled={loading} // disable button while loading
        >
          {loading ? 'Loading...' : 'More Info'} <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default HorrorBanner