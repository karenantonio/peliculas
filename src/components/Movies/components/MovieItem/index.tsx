import styles from './MovieItem.module.css'
import HearthFilled from '../../../../assets/image/hearth-filled.png'
import HearthunFilled from '../../../../assets/image/hearth-unfilled.png'
import useLikeMovies from '../../../../hooks/useLikeMovies'

type Props = {
    id: number
    title: string
    overview: string
    poster_path: string
    onMovieClick: (id: number) => void
}

const MovieItem = ({ id, title, overview, poster_path, onMovieClick }: Props) => {

    const { isMovieLiked, toggleMovieLiked } = useLikeMovies(id)

    const handleSeeMoreClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation()
        onMovieClick(id)
    };

    const handleHearthClick = () => {
        toggleMovieLiked()
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.imagenContainer}>
                    <img src={isMovieLiked ? HearthFilled : HearthunFilled} alt="hearth-filled" className={styles.hearthImage} onClick={handleHearthClick} />
                    <img src={poster_path} alt={title} height={330} width={220} />
                </div>
                <div className={styles.movieInfoContainer}>
                    <h4 className={styles.movieName}>{title}</h4>
                    <p className={styles.movieInfo}>{overview}</p>
                    <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>Ver más</button>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;