declare module "./fetchMovies" {
    export type MovieData = {
        // name: string;
        // images: { url: string }[];
        // info: string;
        // dates: { start: { dateTime: string } };
        // seatmap: { staticUrl: string };
        // pleaseNote: string;
        // priceRanges: { min: number; max: number; currency: string }[];
        // url: string;
    };

    console.log('entra aca');

    export function fetchMovieDetail(movieId: number): Promise<MovieData>;
    export function fetchData(movieId: number): { movieDetail: Promise<MovieData> };
}