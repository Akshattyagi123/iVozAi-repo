import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    Movie Browser
                </Link>
                <Link
                    to="/favorites"
                    className="text-white text-lg font-medium hover:text-yellow-300"
                >
                    Favorites
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
