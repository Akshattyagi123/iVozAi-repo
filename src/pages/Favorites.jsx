import { Link } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../utils/favorites";

const Favorites = () => {
    const favorites = getFavorites();

    const handleRemoveFavorite = (imdbID) => {
        removeFromFavorites(imdbID);
        window.location.reload(); // Refresh to update the list
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold">Your Favorites</h2>
            {favorites.length === 0 ? (
                <p>No favorite movies added yet!</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
                                alt={movie.Title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="font-bold text-lg">{movie.Title}</h3>
                                <p className="text-sm text-gray-500">{movie.Year}</p>
                                <button
                                    onClick={() => handleRemoveFavorite(movie.imdbID)}
                                    className="text-red-600 font-medium inline-block mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
