import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen  border border-purple-500 2xl:w-[1720px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

    </div>
  );
}

export default App;
