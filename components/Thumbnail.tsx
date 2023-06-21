import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

interface Props {
  movie: Movie | DocumentData
  image: string;
}

function Thumbnail({ movie, id }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  // Extract the image URL from the movie data
  const imageUrl = movie.image;

  return (
    <div
      className="titleTwo relative h-28 min-w-[180px] cursor-pointer group-hover:stroke-white transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={movie.image}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
      <h1 className="titleOne">{movie?.title}</h1>
      <p>Movie ID: {id}</p>
    </div>
  )
}

export default Thumbnail


