import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/omdbApi";
import { saveToFavorites, removeFromFavorites, getFavorites } from "../utils/favorites";

const MovieDetails = () => {
    const { id } = useParams(); // Get the IMDb ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const data = await getMovieDetails(id);
            if (data.Response === "True") {
                setMovie(data);
            }
            setLoading(false);
        };

        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        // Check if the movie is already in the favorites
        if (movie) {
            const favorites = getFavorites();
            setIsFavorite(favorites.some((fav) => fav.imdbID === movie.imdbID));
        }
    }, [movie]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(movie.imdbID);
        } else {
            saveToFavorites(movie);
        }
        setIsFavorite(!isFavorite);
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;

    if (!movie) return <p className="text-center mt-4">Movie not found.</p>;

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
                    alt={movie.Title}
                    className="w-full sm:w-72 h-96 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl font-bold">{movie.Title}</h2>
                    <p className="text-lg text-gray-700">{movie.Year} | {movie.Genre}</p>
                    <p className="text-sm text-gray-500">Director: {movie.Director}</p>
                    <p className="mt-4">{movie.Plot}</p>
                    <div className="mt-4">
                        <p className="font-bold">Ratings:</p>
                        {movie.Ratings.map((rating) => (
                            <div key={rating.Source} className="text-sm text-gray-600">
                                {rating.Source}: {rating.Value}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleFavoriteClick}
                        className={`mt-6 px-4 py-2 rounded-lg ${isFavorite ? "bg-red-600" : "bg-blue-600"} text-black`}
                    >
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
