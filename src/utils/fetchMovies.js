import wrapPromise from "./wrapPromise";

const fetchMovieDetail = async (movieId) => {
    console.log('data from fetchMovieDetail');
    try {
        // const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${movieId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
        // const data = await response.json();
        
        // return data;
    } catch (error) { }
};

const fetchData = (movieId) => {
    return {
        movieDetail: wrapPromise(fetchMovieDetail(movieId))
    };
};

export default fetchData;