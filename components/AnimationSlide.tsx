import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { movieState, modalState } from '../atoms/modalAtom';

interface Movie {
  id: string;
  title: string;
  image: string;
}

function AnimationSlide({ title }: { title: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const setMovie = useSetRecoilState(movieState);
  const setShowModal = useSetRecoilState(modalState);

  useEffect(() => {
    const fetchMovies = async () => {
      const cacheKey = 'cachedAnimationMovies';
      const cachedData = localStorage.getItem(cacheKey);
      const currentTime = new Date().getTime();
      const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        if (currentTime - parsedCache.timestamp < cacheExpiry) {
          setMovies(parsedCache.data);
          return; // Return early if data was found in cache
        }
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}genre/animation`;

      try {
        const response = await axios.get(apiUrl);

        if (
          response.data &&
          response.data.status === 'success' &&
          response.data.data &&
          Array.isArray(response.data.data.results)
        ) {
          const movieResults = response.data.data.results;
          setMovies(movieResults);

          // Cache the response data
          const cacheData = {
            data: movieResults,
            timestamp: currentTime,
          };
          localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } else {
          console.error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleLatestSlideItemClick = (movieItem: Movie) => {
    setMovie(movieItem);
    setShowModal(true);
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-48 h-60" onClick={() => handleLatestSlideItemClick(movie)}>
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full mr-40 object-cover rounded-sm cursor-pointer hover:opacity-80"
              />
              <span className="absolute bottom-0 bg-black rounded-sm bg-opacity-60 text-sm text-white p-1 w-11/12 overflow-ellipsis overflow-hidden whitespace-nowrap">
                {movie.title}
              </span>
            </div>
          ))}
        </div>

        <ChevronRightIcon
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}

export default AnimationSlide;
