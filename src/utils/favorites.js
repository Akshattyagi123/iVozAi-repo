export const saveToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const removeFromFavorites = (imdbID) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
};
