import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'
import { useEffect, useState } from 'react'

interface Props {
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    // Fetch movie data from API and update imageUrl
    fetch(`https://api.weflixx.com/api/info?mediaId=${movie.id}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setImageUrl(data.data.image)
        }
      })
  }, [movie.id])

  return (
    <div
      className=" relative mr-1 w-auto h-60 min-w-[160px] cursor-pointer group-hover:stroke-white transition duration-200 ease-out md:h-75  md:min-w-[180px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          className="rounded-sm md:rounded"
          layout="fill"
        />
      )}
      <span className="absolute bottom-0 bg-black rounded-sm bg-opacity-60 text-sm text-white p-1 w-11/12 overflow-ellipsis overflow-hidden whitespace-nowrap">{movie.title}</span>
    </div>
  )
}

export default Thumbnail



