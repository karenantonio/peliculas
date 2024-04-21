import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from './Detail.module.css'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Navbar from "../../components/Navbar"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HearthFilled from '../../assets/image/hearth-filled.png'
import HearthunFilled from '../../assets/image/hearth-unfilled.png'
import useLikeMovies from '../../hooks/useLikeMovies'

interface MovieData {
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
}

const Detail = () => {

    const { movieId } = useParams()
    const [movieData, setMovieData] = useState<MovieData | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { isMovieLiked, toggleMovieLiked } = useLikeMovies(Number(movieId))
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&language=es-ES&include_adult=false`)
                const data = await response.json()
                setMovieData(data)
                setIsLoading(false)
            } catch (error) {
                setError(error as Error)
                setIsLoading(false)
            }
        }
        fetchMoviesData()
    }, [movieId])

    if (isLoading) {
        return (
            <div className="loading centerContent">
                Cargando película...
            </div>
        )
    }

    if (error) {
        return <div>Ha ocurrido un error</div>;
    }

    const formattedDate = movieData?.release_date 
    ? format(new Date(movieData.release_date + 'T00:00:00Z'), "dd/MM/yyyy", { locale: es })
    : '';

    // const formattedDuration = movieData?.runtime
    // ? formatDuration(parse(`PT${movieData.runtime}M`, 'ISO 8601'), {
    //     units: ['hours', 'minutes'],
    //     locale: { es }, // Specify Spanish locale (optional)
    //   })
    // : '';

    const formattedRating = (movieData?.vote_average) ? (
        Math.round(movieData?.vote_average * 10) / 10 + '%'
    ) : 'N/A';


    const handleHearthClick = () => {
      toggleMovieLiked()
    }

    const backdropPath = 'https://image.tmdb.org/t/p/original/' + movieData?.backdrop_path;

    return (
        <>
        <Navbar />
        <div className={styles.detailContainer} style={{ backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backdropPath})`, height: '100vh' }}>
        <Row  xs={12} md={12} xl={12} className="p-5 m-0 mx-auto justify-content-center align-items-center">
            <Col xs={12} md={6} xl={4}>
                <img src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`} alt={movieData?.title} className={styles.posterImage} />
            </Col>
            <Col xs={12} md={6} xl={8} className="d-flex flex-column justify-content-center p-0 m-0 align-items-center">
                
                <div className={styles.movieDetails}>
                    <img
                        src={isMovieLiked ? HearthFilled : HearthunFilled}
                        alt="hearth-filled"
                        className={`hearthImage ${isMovieLiked ? 'likedHeart' : ''}`}
                        onClick={handleHearthClick}
                    />
                    <h1 className={styles.movieName}>{movieData?.title}</h1>
                    {movieData?.tagline && <p className={styles.tagline}>{movieData?.tagline}</p>}
                    <p className={styles.infoMovie}>
                    {formattedDate} ({movieData?.origin_country}) * {movieData?.genres && movieData?.genres.map((genre) => genre.name).join(', ')} {/* * {formattedDuration} */}
                    </p>
                     
                    <p className={styles.infoParagraph}>{movieData?.overview}</p>
               
                    <div>
                        <p className={styles.scoreLabel}>Puntuación:</p>
                        <p className={styles.scoreValue}>{formattedRating}</p>
                    </div>

                    <div>
                        {movieData?.imdb_id && (
                        <Link to={`https://www.imdb.com/title/${movieData?.imdb_id}`} className={styles.imdbLink} target="_blank">Ir a ficha IMDb</Link>
                        )}
                        {movieData?.homepage && (
                        <a href={movieData?.homepage} rel="noreferrer" className={styles.homepageLink} target="_blank">Sitio Oficial</a>
                        )}
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button onClick={() => navigate(-1)}>Volver</button>
                    </div>

                </div>
            </Col>
        </Row>
        </div>
        </>
    )
}

export default Detail