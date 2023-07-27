import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { modalState, movieState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import Modal from '../components/Modal';
import Header from '../components/Header';


interface Movie {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  type: string;
  duration: string;
  seasons: number | null;
  lastEpisodes: number | null;
}

interface Pagination {
  currentPage: number | string;
  hasNextPage: boolean;
}



const SearchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, hasNextPage: false });
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const router = useRouter();

  useEffect(() => {
    // Grab the query from the URL and update the component's state
    const queryFromUrl = router.query.q;
    if (typeof queryFromUrl === 'string') {
      setQuery(queryFromUrl);
    }
  }, [router.query]);

  useEffect(() => {
    // Fetch the search results whenever the query changes or the current page changes
    if (query) {
      searchMovies();
    }
  }, [query, pagination.currentPage]);

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MOVIE_URL}${query}?page=${pagination.currentPage}`
      );
      const data = await response.json();
      setMovies(data?.results ?? []);
      setPagination({
        currentPage: data?.currentPage ?? 1,
        hasNextPage: data?.hasNextPage ?? false,
      });
    } catch (error) {
      // console.error('Error searching movies:', error);
    }
  };

  const handleModalOpen = (movie: Movie) => {
    setCurrentMovie(movie);
    setShowModal(true);
  };

  const handleNextPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: +prevPagination.currentPage + 1,
    }));
  };
  
  const handlePrevPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: +prevPagination.currentPage - 1,
    }));
  };
  
  
  

  return (
    <div>
      <Header />

      <main className="backgroundMaster relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="pt-24 mt-5 w-4/5 m-auto">
        <div className="text-center w-full mb-4">
            <h1 className="text-2xl ">Search result for "{query}"</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4 lg:grid-cols-6 md:grid-cols-3">
         
             {movies?.map((movie) => (
              <div key={movie?.id}>
                <img
                  className="rounded h-44 w-auto m-auto cursor-pointer md:h-48 lg:h-52"
                  src={movie?.image}
                  alt={movie?.title}
                  onClick={() => handleModalOpen(movie)}
                />
                <h2 className="text-xs pt-2 pb-4 text-center sm:text-lg">
                  {movie?.title}
                </h2>
              </div>
            ))}
            </div>
  
            <div className="flex justify-center mt-4">
              {pagination.currentPage > 1 && (
                <button
                  className="px-4 py-2 mx-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={handlePrevPage}
                >
                  Previous
                </button>
              )}
  
              {pagination.hasNextPage && (
                <button
                  className="px-4 py-2 mx-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </main>
        {showModal && <Modal openModal={() => {}} closeModal={() => {}} />}
      </div>
    );
  };
  
  export default SearchMovies;
  






  
  
  