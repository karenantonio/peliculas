import wrapPromise from "./wrapPromise";

const fetchMovieDetail = async (movieId) => {
    console.log('data from fetchMovieDetail');
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&language=es-ES&include_adult=false`)
        const data = await response.json();
        return data;
    } catch (error) { }
};

const fetchData = (movieId) => {
    return {
        movieDetail: wrapPromise(fetchMovieDetail(movieId))
    };
};

export default fetchData;