import { useState } from "react";

interface MovieResponse {
    results: any[]
    page: number
    total_pages: number
}

// * hook para hacer una llamada a la API y guardarlo en el estado local
const useMoviesData = () => {

    const [data, setData] = useState<MovieResponse | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null);

    const fetchMovies = async (params: string | undefined) => {

        console.log('data from fetchMovies useMoviesData params:', params);

        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&language=es-ES&include_adult=false`)
            const data = await response.json()
            setData(data)
            setIsLoading(false)
        } catch (error) {
            setError(error as Error)
        }
    }

    return {
        movies: data?.results || [],
        page: data?.page || {}, 
        isLoading,
        error,
        fetchMovies
    }
}

export default useMoviesData;