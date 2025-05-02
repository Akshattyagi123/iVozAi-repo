import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}
                alt={movie.Title}
                className="w-full h-64 object-cover"
            />
            <div className="p-3">
                <h3 className="font-bold text-lg">{movie.Title}</h3>
                <p className="text-sm text-gray-500">{movie.Year}</p>
                <Link
                    to={`/movie/${movie.imdbID}`}
                    className="text-blue-600 font-medium inline-block mt-2"
                >
                    More Info
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
