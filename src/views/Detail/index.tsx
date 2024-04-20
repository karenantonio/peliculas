import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from './Detail.module.css'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Navbar from "../../components/Navbar"

interface MovieData {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
}

const Detail = () => {

    const { movieId } = useParams()
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&language=es-ES&include_adult=false`)
                const data = await response.json()
                console.log('data from Detail', data);
                setMovieData(data)
                setIsLoading(false)
            } catch (error) {
                setError(error as Error)
                setIsLoading(false)
            }
        }
        fetchMoviesData()
    }, [])

    if (isLoading) {
        return <div>Cargando pelicula...</div>;
    }

    if (error) {
        return <div>Ha ocurrido un error</div>;
    }

    const formattedDate = movieData?.release_date 
    ? format(new Date(movieData.release_date + 'T00:00:00Z'), "dd/MM/yyyy", { locale: es })
    : '';

    return (
        <>
            <Navbar />
            <div>
                <div className={styles.mainInfoContainer}>
                    <img src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`} alt={movieData?.title} className={styles.movieImage} />
                    <h1 className={styles.movieName}>{movieData?.title}</h1>
                    <p className={styles.infoParagraph}>{movieData?.overview}</p>
                    <p className={styles.dateParagraph}>{formattedDate}</p>
                </div>
            </div>
        </>
  
    )
}

export default Detail