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
      <img
                    src="/search.png"
                    width="20px"
                    height="20px"
                    className="object-contain left-3 top-2 absolute "
        />
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

