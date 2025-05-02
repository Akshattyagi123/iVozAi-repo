const SearchBar = ({ query, setQuery, onSearch }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="relative flex shadow-md rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-50">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 bg-white text-gray-700 focus:outline-none placeholder-gray-400"
                aria-label="Search movies"
            />
            <button
                onClick={onSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-black px-6 py-3 transition-colors duration-200 flex items-center justify-center font-medium"
                aria-label="Search"
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                Search
            </button>
        </div>
    );
};

export default SearchBar;