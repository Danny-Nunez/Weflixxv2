import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'



function Footer() {
  return (
    <div className="mt-40 p-4 bg-black text-center text-white m-auto">
      © {new Date().getFullYear()} WeFlixx.com
    </div>
  )
}

export default Footer
