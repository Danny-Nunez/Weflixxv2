import { BellIcon, SearchIcon, UserIcon, ArrowLeftIcon, PencilIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import BasicMenu from './BasicMenu'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import SearchForm from './SearchForm';
import ProfileImage from './ProfileImage';

interface ProfileImageProps {
  photoURL: string | null | undefined;
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false)
  const [query, setQuery] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

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
    
    <header className={`${isScrolled ? 'bg-black' : 'bg-gradient-to-t from-transparent to-black'} transition-all duration-500 ease-in-out`}>
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
          <Link href="/news">
            <li className="headerLink menuShadow">News</li>
          </Link>
          <Link href="/mylist">
            <li className="headerLink menuShadow">My List</li>
          </Link>
        </ul>
      </div>

      <div className="flex flex-row" >
        <div className=" hidden md:inline">
          <SearchForm query={query} setQuery={setQuery} onSubmit={handleSearch} />
        </div>
        <div onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(false)} 
            className=" text-sm font-light triangle hidden md:flex">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button 
            
            className="  inline-flex w-full justify-center gap-x-1.5 rounded-md px-1 py-2 pb-1 pt-1 text-sm ring-inset ring-gray-300 hover:text-gray-200 focus:outline-none">
              
              <ProfileImage photoURL={user?.photoURL || undefined} />
              <svg className="mt-4 " xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="white" viewBox="0 0 24 24"><path d="M18.5,15.5l-6-7l-6,7H18.5z"/></svg>
             
            </Menu.Button>
          </div>

          <Transition
            show={isShowing}
            // onMouseEnter={() => setIsShowing(true)}
            // onMouseLeave={() => setIsShowing(false)}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute bg-black right-0 z-10 mt-1 w-36 origin-top-right border-1 rounded-md ring-0 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  <Link href="/account">
                    <a className="text-gray-300 block px-0 py-2 text-sm mr-1 flex-row flex hover:underline">
                      
                    <img
                    src="/user.png"
                    width="14px"
                    height="14px"
                    className="cursor-pointer object-contain ml-3 mr-2"
        />Account
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/account">
                    <a className="text-gray-300 block px-0 py-2 text-sm mr-1 flex-row flex hover:underline">
                    <img
                    src="/edit.png"
                    width="14px"
                    height="14px"
                    className="cursor-pointer object-contain ml-3 mr-2"
        />
                      Edit Profile
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item >
                 
                  <a
                    onClick={logout}
                    href="#"
                    className="border-t border-gray-700 text-gray-300 block px-0 py-2 mt-2 text-sm mr-1 flex-row flex hover:underline"
                  >
                    <img
                    src="/logout.png"
                    width="15px"
                    height="15px"
                    className="cursor-pointer object-contain ml-3 mr-2"
        />
                    Logout
                  </a>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        </div>
      </div>
    </header>
   
  );
}

export default Header;

