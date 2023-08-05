import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
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
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const queryFromUrl = router.query.q;
    if (typeof queryFromUrl === 'string') {
      setQuery(queryFromUrl);
    }
  }, [router.query]);

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [query, pagination.currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && pagination.hasNextPage) {
            handleNextPage();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [pagination]);

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MOVIE_URL}${query}?page=${pagination.currentPage}`
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data?.results ?? []]);
      setPagination({
        currentPage: data?.currentPage ?? 1,
        hasNextPage: data?.hasNextPage ?? false,
      });
    } catch (error) {
      console.error('Error searching movies:', error);
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

  return (
    <div>
      <Header />
      <main className="backgroundMaster relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <div className="pt-24 mt-5 w-4/5 m-auto">
          <div className="text-center w-full mb-4">
            <h1 className="text-2xl ">Search result for "{query}"</h1>
          </div>

          <div className="flex flex-wrap gap-2.5 md:gap-4 lg:gap-5 md:p-2">
             {movies?.map((movie) => (
              <div key={movie?.id} className="relative w-36 lg:w-44 md:w-48 h-auto mb-10 cursor-pointer hover:opacity-80 rounded" onClick={() => handleModalOpen(movie)}>
                <LazyLoadImage
                  src={movie?.image}
                  alt={movie?.title}
                  effect="blur"
                  className="w-full h-full object-cover rounded-sm cursor-pointer hover:opacity-80 rounded"
                />
                <div className="absolute bottom-0 left-0 bg-black rounded-sm bg-opacity-60 text-sm text-white p-1 w-48 truncate">
                  {movie?.title}
                </div>
              </div>
            ))}
          </div>
          {/* Use a ref to observe when this element comes into the viewport */}
          <div ref={observerRef}></div>
        </div>
      </main>
      {showModal && <Modal openModal={() => {}} closeModal={() => {}} />}
    </div>
  );
};

export default SearchMovies;


  






  
  
  