declare module "./fetchMovies" {
    export type MovieData = {
        id: number;
        title: string;
        backdrop_path: string;
        poster_path: string;
        overview: string;
        release_date: string;
        status: string;
        vote_average: number;
        vote_count: any;
        tagline:string
        popularity: number
        imdb_id: string
        homepage: string
        runtime: number
        revenue: any
        genres: {
            id:number
            name:string
        }[]
        origin_country:string
    };

    console.log('data from fetchMovies MovieData');

    export function fetchMovieDetail(movieId: number): Promise<MovieData>;
    export function fetchData(movieId: number): { movieDetail: Promise<MovieData> };
}