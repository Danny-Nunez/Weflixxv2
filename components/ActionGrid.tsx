import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useRef, useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { movieState, modalState } from '../atoms/modalAtom';

interface Movie {
  id: string;
  title: string;
  image: string;
}

function ActionGrid({ title }: { title: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page of data
  const setMovie = useSetRecoilState(movieState);
  const setShowModal = useSetRecoilState(modalState);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}genre/action?page=${currentPage}`;

      try {
        const response = await axios.get(apiUrl);

        if (
          response.data &&
          response.data.status === 'success' &&
          response.data.data &&
          Array.isArray(response.data.data.results)
        ) {
          const movieResults = response.data.data.results;
          setMovies((prevMovies) => [...prevMovies, ...movieResults]); // Append new data to the existing movies array
        } else {
          console.error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]); // Fetch data when currentPage changes

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      // Check if user has scrolled to the bottom of the page
      // Load next page when scrolled to the bottom
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the scroll event listener
      window.removeEventListener('scroll', handleScroll);
    };
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
    <div className="h-[40vh] space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <div
          ref={rowRef}
          className="flex flex-wrap gap-2.5 md:gap-4 lg:gap-5 md:p-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-44 lg:w-48 md:w-48 h-auto mb-10 cursor-pointer hover:opacity-80 rounded" onClick={() => handleLatestSlideItemClick(movie)}>
              <LazyLoadImage
                src={movie.image}
                alt={movie.title}
                effect="blur" // Use the opacity effect when image comes into view
                className="w-full h-full object-cover rounded-sm cursor-pointer hover:opacity-80 rounded"
              />
              <div className="absolute bottom-0 left-0 bg-black rounded-sm bg-opacity-60 text-sm text-white p-1 w-48 truncate">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActionGrid;



