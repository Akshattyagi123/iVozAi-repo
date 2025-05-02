import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/omdbApi";

const Home = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle search when query changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length >= 3) {
                handleSearch();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = async () => {
        if (query.length < 3) return;

        setLoading(true);
        setError("");

        try {
            const data = await searchMovies(query);

            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setMovies([]);
                setError(data.Error || "No movies found");
            }
        } catch (err) {
            setError("Failed to fetch movies. Please try again.");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 border border-blue-700  ">


            {/* Header */}
            <header className="w-full bg-indigo-900 text-white shadow-lg">
                <div className="w-full px-4 py-6">
                    <h1 className="text-3xl font-bold text-center sm:text-4xl">
                        Movie Hub
                    </h1>
                    <p className="text-indigo-200 text-center mt-2">
                        Discover your next favorite film
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full px-4 py-6">
                {/* Search Section */}
                <div className="w-full mb-8">
                    <SearchBar
                        query={query}
                        setQuery={setQuery}
                        onSearch={handleSearch}
                    />
                </div>

                {/* Status Messages */}
                {loading && (
                    <div className="flex justify-center items-center py-12 w-full">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-indigo-700 font-medium">Searching for movies...</p>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center py-12 w-full">
                        <p className="text-red-500 font-medium">{error}</p>
                        <p className="mt-2 text-gray-600">Try a different search term</p>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && movies.length > 0 && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4 text-indigo-800">
                            Search Results <span className="text-gray-500">({movies.length} found)</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && movies.length === 0 && query.length >= 3 && (
                    <div className="text-center py-16 w-full">
                        <p className="text-lg text-gray-600">No movies found matching "{query}"</p>
                    </div>
                )}

                {/* Initial State */}
                {!loading && !error && movies.length === 0 && query.length < 3 && (
                    <div className="text-center py-16 px-4 w-full flex flex-col items-center justify-center flex-grow ">
                        <div className="w-full">
                            <h2 className="text-2xl font-bold text-indigo-800 mb-3">Welcome to Movie Hub</h2>
                            <p className="text-gray-600 mb-8">
                                Search for your favorite movies above to get started.
                                Try searching for titles like "Avengers", "Star Wars", or "Inception".
                            </p>
                            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                                {["Action", "Comedy", "Drama"].map((genre) => (
                                    <button
                                        key={genre}
                                        onClick={() => setQuery(genre)}
                                        className="bg-white rounded-lg shadow py-3 px-4 text-indigo-700 hover:bg-indigo-50 transition-colors"
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="w-full bg-indigo-900 text-indigo-200 py-4">
                <div className="w-full px-4 text-center text-sm">
                    <p>© {new Date().getFullYear()} Movie Hub. All movie data provided by OMDB API.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;