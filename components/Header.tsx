import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicMenu from './BasicMenu'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import SearchForm from './SearchForm';
import ProfileImage from './ProfileImage';


// import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface ProfileImageProps {
  photoURL: string | null | undefined;
}


function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
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
      pathname: '/searchmovies',
      query: { q: query },
    });
  };
  

  return (
    <header className={`${isScrolled && 'bg-[#000]'}`}>
      <div className="flex items-center space-x-3 md:space-x-10">
        <img
          src="/weflixxlogo.svg"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
        <Link href="/">
            <li className="headerLink menuShadow">Home</li>
          </Link>
          <Link href="/account">
          <li className="headerLink menuShadow">My Account</li>
          </Link>
          {/* <Link href="/">
          <li className="headerLink menuShadow">Movies</li>
        </Link> */}
        <Link href="/news">
          <li className="headerLink menuShadow">News</li>
          </Link>
          <Link href="/mylist">
          <li className="headerLink menuShadow">My List</li>
          </Link>
        </ul>
      </div>

      <div className="flex text-sm font-light">
      {/* <Link href="/searchmovies"><SearchIcon className="hidden h-6 w-6 sm:inline cursor-pointer" /></Link> */}

      <div className=" hidden md:inline  "><SearchForm query={query} setQuery={setQuery} onSubmit={handleSearch} /></div>


      <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-1 py-2 pb-1 pt-1 text-sm  ring-inset ring-gray-300 hover:text-gray-200">
       {/* <span className="pt-1 pl-1 menuShadow">Adult</span> */}
       
    
         
       <ProfileImage photoURL={user?.photoURL || undefined} />
      

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
        <Menu.Items className="absolute right-0 z-10 mt-1 w-26 origin-top-right border-1 rounded-md  ring-0 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
           
            <Menu.Item>
              {({ active }) => (
                <a onClick={logout}
                  href="#"
                  className={classNames(
                    active ? 'text-white-300' : 'text-gray-300',
                    'block px-0 py-0 text-sm mr-1'
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

export default Header
