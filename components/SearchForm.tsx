import React, { useState, useRef } from 'react';

interface SearchFormProps {
  query: string;
  setQuery: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, setQuery, onSubmit }) => {
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    setIsClicked(true);
    if(inputRef.current){
      inputRef.current.focus();
    }
  }

  const handleBlur = () => {
    setIsClicked(false);
  }

  return (
    <form className="max-w-sm px-6 mt-2" onSubmit={onSubmit}>
      <div className="relative">
        <img
          src="/search.png"
          width="27px"
          height="27px"
          className={`cursor-pointer object-contain top-2 hover:scale-105 absolute ${isClicked ? 'left-3' : 'right-3'}`}
          onClick={handleClick}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={isClicked ? "Search" : ""}
          className={`py-2 pb-2 pl-12 pr-4 text-gray-500 ${isClicked ? 'w-4/5 sm:w-full border bg-black transition-all duration-500 ease-in-out' : 'w-0 border-0 bg-transparent'} rounded-md outline-none`}
          required
          onChange={(event) => setQuery(event.target.value)}
          onBlur={handleBlur}
          readOnly={!isClicked}
        />
      </div>
    </form>
  );
};

export default SearchForm;












