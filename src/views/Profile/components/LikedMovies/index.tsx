import { useEffect, useState } from "react"
import { LIKED_MOVIES_STORAGE_KEY } from '../../../../utils/constants';
import MovieItem from "../../../../components/Movies/components/MovieItem"
import { useNavigate } from "react-router-dom"

interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string
}

const LikedMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            try {
                setIsLoading(true)
                const likedMovies = JSON.parse(localStorage.getItem(LIKED_MOVIES_STORAGE_KEY) || '[]')

                const results = []
                for(const movieId of likedMovies) {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}`)
                    const data = await response.json()
                    results.push(data)
                }
            
                setMovies(results)
           
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMoviesDetails()
    },[])

    const handleMovieItemClick = (movieId: number) => {
        navigate(`/detail/${movieId}`)
    }

    if(error !== null){
        return <div>Ha ocurrido un error</div>
    }

    if (isLoading) {
        return <div>Cargando peliculas favoritas...</div>
    }

    return (
        <div>
            {movies.map((movie, index) => (
                <MovieItem 
                    key={`liked-movie-item-${movie.id}-${index}`}
                    id={movie.id} 
                    title={movie.title}
                    overview={movie.overview ?? ''} 
                    poster_path={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    onMovieClick={() => handleMovieItemClick(movie.id)}
                />
            ))}
        </div>
    )
}

export default LikedMovies