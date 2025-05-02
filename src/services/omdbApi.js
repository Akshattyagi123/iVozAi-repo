const API_KEY = "a97fcadc";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page = 1) => {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    const data = await res.json();
    return data;
};

export const getMovieDetails = async (id) => {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await res.json();
    return data;
};
