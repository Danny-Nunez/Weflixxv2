import React from 'react';

interface SearchFormProps {
    query: string;
    setQuery: (value: string) => void;
    onSubmit: (event: React.FormEvent) => void;
  }

  const SearchForm: React.FC<SearchFormProps> = ({ query, setQuery, onSubmit }) => {
    return (
    <form className="max-w-sm px-6 mt-2" onSubmit={onSubmit}>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          placeholder="Search"
          className=" w-4/5 sm:w-full py-2 pb-2 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-transparent focus:bg-white focus:border-indigo-600"
          required
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchForm;

