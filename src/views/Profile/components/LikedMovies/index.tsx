import { useEffect, useState } from "react"
import { LIKED_MOVIES_STORAGE_KEY } from '../../../../utils/constants';
import MovieItem from "../../../../components/Movies/components/MovieItem"
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './LikedMovies.module.css'

interface Movie {
    id: number
    title: string
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
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&language=es-ES&include_adult=false`)
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
        return (
            <div className="loading centerContent">
                Cargando peliculas favoritas...
            </div>
        )
    }

    return (
        <Row xs={2} md={3} xl={5} className="g-4 p-0 m-0">
        {movies.map((movie, index) => (
        <Col key={movie.id}>
            <Card className={styles.movieCard} style={{ padding: 0, margin:'auto' }}>
            <MovieItem
                key={`liked-movie-item-${movie.id}-${index}`}
                id={movie.id} 
                title={movie.title}
                poster_path={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                onMovieClick={() => handleMovieItemClick(movie.id)}
            />
            </Card>
        </Col>
        ))}
        </Row>
    )
}

export default LikedMovies