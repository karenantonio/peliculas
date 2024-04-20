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
    // info: string;
    // url: string
    // images: {
    //     url: string;
    // }[];
    // dates: {
    //     start: {
    //         dateTime: any
    //     };
    // };
    // seatmap: {
    //     staticUrl: string;
    // };
    // pleaseNote: string;
    // priceRanges: {
    //     min: string;
    //     max: string;
    //     currency: string;
    // }[];
}

const Detail = () => {

    const { movieId } = useParams()
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}`)
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

    return (
        <>
            <Navbar />
            <div>
                <div className={styles.mainInfoContainer}>
                    <img src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`} alt={movieData?.title} className={styles.movieImage} />
                    <h1 className={styles.movieName}>{movieData?.title}</h1>
                    <p className={styles.infoParagraph}>{movieData?.overview}</p>
                    {movieData?.release_date ? <p className={styles.dateParagraph}>{format(new Date(movieData?.release_date), "d/MM/yyyy", {locale: es})}</p> : '' }
                </div>
                {/* <div className={styles.seatInfoContainer}>
                    <img src={movieData?.seatmap?.staticUrl} alt="Seatmap" />
                    <p className={styles.pleaseNoteLegend}>{movieData?.pleaseNote}</p>
                    <p className={styles.priceRangeLegend}>Rango de precios: {movieData?.priceRanges?.[0].min}-{movieData?.priceRanges?.[0].max} {movieData?.priceRanges?.[0].currency}</p>
                </div>
                <a href={movieData?.url}>
                    Ir por tus boletos
                </a> */}
            </div>
        </>
  
    )
}

export default Detail