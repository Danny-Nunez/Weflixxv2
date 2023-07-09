import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Link from 'next/link'


function Footer() {
  return (
    <div className="mt-40 p-4 bg-black text-center text-white m-auto">
      <div>
        <ul className="flex justify-center mb-4">
        <li className="mr-4 hover:underline cursor-pointer"><Link href="/termsconditions">
            <a className="text-gray-300 text-xs ">Terms & Conditions</a>
            </Link></li> -
        <li className="ml-4 hover:underline cursor-pointer">
        <Link href="/privacypolicy">
            <a className="text-gray-300 text-xs ">Privacy Policy</a>
            </Link></li>
        </ul>
      </div>
      © {new Date().getFullYear()} WeFlixx.com
    </div>
  )
}

export default Footer
