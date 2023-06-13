import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicMenu from './BasicMenu'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import SearchForm from './SearchForm';
// import { ChevronDownIcon } from '@heroicons/react/20/solid'



function Headerkids() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push({
      pathname: '/searchmovieskids',
      query: { q: query },
    });
  };
  

  return (
    <header className={`${isScrolled && 'bg-[#000]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="/weflixxlogo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
        <Link href="/kids">
            <li className="headerLink menuShadow">Home</li>
          </Link>
          <Link href="/accountkids">
          <li className="headerLink menuShadow">My Account</li>
          </Link>
          {/* <Link href="/">
          <li className="headerLink menuShadow">Movies</li>
        </Link> */}
        <Link href="/newskids">
          <li className="headerLink menuShadow">News</li>
          </Link>
          <Link href="/mylistkids">
          <li className="headerLink menuShadow">My List</li>
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
      {/* <Link href="/searchmovies"><SearchIcon className="hidden h-6 w-6 sm:inline cursor-pointer" /></Link> */}

      <SearchForm query={query} setQuery={setQuery} onSubmit={handleSearch} />


      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-1 py-2 pb-1 pt-1 text-sm  ring-inset ring-gray-300 hover:text-gray-200">
       <span className="pt-1 pl-1 menuShadow">Kids</span>
       <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-2 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
       <img
            src="/kidsicon.jpg"
            alt=""
            className="cursor-pointer rounded h-7 mt-0"
          />
         
          

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-1 w-26 origin-top-right border-0 rounded-md  ring-0 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/"
                  className={classNames(
                    active ? ' text-white-300' : 'text-gray-300',
                    'block px-0 py-2 text-sm mr-1 '
                  )}
                >
                  <span className="pr-0 sm:pr-2 menuShadow">Adult</span><img
            src="/adulticon.jpg"
            alt=""
            className="cursor-pointer rounded inline opacity-80 hover:opacity-100 h-7 ml-0"
          />
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a onClick={logout}
                  href="#"
                  className={classNames(
                    active ? 'text-white-300' : 'text-gray-300',
                    'block px-0 py-3 text-sm ml-3'
                  )}
                >
                  Logout
                </a>
              )}
            </Menu.Item>
           
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
        {/* <p className="hidden lg:inline"><Link href="/">Adult</Link></p> */}
        {/* <BellIcon className="h-6 w-6" /> */}
        {/* <Link href="/account">
          <img
            src="/adulticon.jpg"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link> */}
      </div>
    </header>
  )
}

export default Headerkids
