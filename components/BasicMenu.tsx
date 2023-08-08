import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/solid'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isGenreOpen, setGenreOpen] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleGenreClick = () => {
    setGenreOpen(!isGenreOpen);
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push({
      pathname: '/searchmovies',
      query: { q: query },
    });
  };

  return (
    <div className="md:!hidden">
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      className="!capitalize !text-white"
    >
      Browse
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      className="menu"
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}><Link href="/">Home</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link href="/account">My Account</Link></MenuItem>
      <MenuItem onClick={handleGenreClick}>
        <div className="flex inline justify-center pl-1">Genre
        <img 
          src={isGenreOpen ? "/minus.png" : "/plus.png"} 
          alt={isGenreOpen ? "Collapse" : "Expand"}
          className="ml-2 w-3 h-3 mt-1"
        /></div>
      </MenuItem>
      <Collapse in={isGenreOpen}>
        <div className="w-72 grid grid-cols-2 gap-0 ">
          <MenuItem>
            <div className="hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
              <img src="/action.png" width="16px" height="16px"
                  className="cursor-pointer object-contain ml-1 mr-2"/>
              <Link href="/action">Action</Link>
            </div>
          </MenuItem>
            
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/adventure.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/adventure">Adventure</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/animation.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/animation">Animation</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/biography.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/biography">Biography</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/comedy.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/comedy">Comedy</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/crime.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/crime">Crime</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/documentary.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/documentary">Documentary</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/drama.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/drama">Drama</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/family.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/family">Family</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/fantasy.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/fantasy">Fantasy</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/history.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/history">History</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/horror.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/horror">Horror</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/kids.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/kids">Kids</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/music.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/music">Music</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/mystery.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/mystery">Mystery</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/news.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/news">News</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/reality.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/reality">Reality</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/romance.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/romance">Romance</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/science-fiction.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/science-fiction">Science Fiction</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/soap.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/soap">Soap</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/talk.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/talk">Talk</Link>
              </div>
            </MenuItem>
            <MenuItem>
              <div className=" hover:underline cursor-pointer flex inline text-xs font-light text-gray-300">
                <img src="/thriller.png" width="16px" height="16px"
                    className="cursor-pointer object-contain ml-1 mr-2"/>
                <Link href="/thriller">Thriller</Link>
              </div>
            </MenuItem>
          </div>
        </Collapse>
        <MenuItem onClick={handleClose}><Link href="/news">News</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link href="/mylist">My List</Link></MenuItem>
      </Menu>
    </div>
  );
}



