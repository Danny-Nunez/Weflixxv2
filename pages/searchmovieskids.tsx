import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { modalState, movieState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
import Modal from '../components/Modal';
import Headerkids from '../components/Headerkids'


interface Movie {
  title: string;
  poster_path: string;
  backdrop_path: string;
  description: string;
  id: number;
}

const SearchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const router = useRouter()

  useEffect(() => {
    // Grab the query from the URL and update the component's state
    const queryFromUrl = router.query.q;
    if (typeof queryFromUrl === 'string') {
      setQuery(queryFromUrl);
    }
  }, [router.query]);

  useEffect(() => {
    // Fetch the search results whenever the query changes
    if (query) {
      searchMovies();
    }
  }, [query]);

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

  const handleModalOpen = (movie: Movie) => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  return (
    <div>
    <Headerkids />
    <main className="backgroundMaster relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
    
    <div className="pt-24 mt-5 w-4/5 m-auto">
    
  
        <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4 md:grid-cols-3">
            {movies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <div key={movie.id}>
                  <img
                    className="rounded h-5/6 w-5/6 m-auto cursor-pointer"
                    src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    onClick={() => handleModalOpen(movie)}
                  />
                  <h2 className="font-extrabold text-xs pt-2 pb-4 text-center sm:text-lg">
                    {movie.title}
                  </h2>
                </div>
              ))}
          </div>
        </div>
      </main>
      {showModal && <Modal />} {/* Render the modal when showModal is true */}
    </div>
  );
};
  
  export default SearchMovies;
  
  
  