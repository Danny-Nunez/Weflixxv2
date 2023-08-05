import { DocumentData } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../typings';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
  movie: Movie | DocumentData;
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch movie data from API and update imageUrl
    fetch(`${process.env.NEXT_PUBLIC_API_URL}info?mediaId=${movie.id}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setImageUrl(data.data.image)
        }
      })
  }, [movie.id]);

  return (
    <div
      className=" relative mr-1 w-auto h-60 min-w-[160px] cursor-pointer group-hover:stroke-white transition duration-200 ease-out md:h-60 lg:h-60 md:min-w-[160px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      {imageUrl && (
        <LazyLoadImage
          src={imageUrl}
          effect="blur"
          className="rounded-sm md:rounded"
          style={{ width: '100%', height: '100%' }}
        />
      )}
      <span className="absolute bottom-0 bg-black rounded-sm bg-opacity-60 text-sm text-white p-1 w-11/12 overflow-ellipsis overflow-hidden whitespace-nowrap">{movie.title}</span>
    </div>
  );
}

export default Thumbnail;



