import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderSearch from '../components/HeaderSearch';
import { modalState, movieState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'


interface Movie {
  title: string;
  poster_path: string;
  backdrop_path: string;
  description: string;
}

const Test = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };
  
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setMovies([]); // Clear the old search results
    await searchMovies();
    setQuery(''); // Clear the query after each search
  };
  

  return (
    <div>
    <HeaderSearch />
    <main className="backgroundMaster relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
    
    <div className="pt-24 w-4/5 m-auto">
      <form className="flex w-4/5 m-auto items-center pb-5 " onSubmit={handleSearch}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
  
        <div
  className="grid grid-cols-3 gap-4 pt-4 sm:grid-cols-4"
  onClick={(event) => {
    const { currentTarget } = event;
    const movie = movies[currentTarget.dataset.index];
    setCurrentMovie(movie);
    setShowModal(true);
  }}
>
  {movies
    .filter((movie) => movie.poster_path)
    .map((movie, index) => (
      <div
        key={movie.title}
        data-index={index}
      >
        <img
          className="rounded h-5/6 w-5/6 m-auto"
          src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <h2 className="font-extrabold text-xs pt-2 pb-4 text-center sm:text-lg">
          {movie.title}
        </h2>
      </div>
    ))}
</div>
      </div>
      </main>
      </div>
    );
  };
  
  export default Test;
  
  
  