import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
  netflixOriginals: Movie[]
}

function Footer({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)


  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[5vh] lg:justify-center lg:pb-12 ">
      <div className="m-auto">
      <ul className="hidden space-x-6 md:flex">
          <li className="headerLink">DCMA</li> 
          <li className="headerLink">FAQ</li>  
        </ul>
        </div>
        <div className="m-auto">
        <p className="text-sm">Copyright © WeFlixx 2023 </p>
        </div>
    </div>
  )
}

export default Footer
