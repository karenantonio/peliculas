import styles from './MovieItem.module.css'
import HearthFilled from '../../../../assets/image/hearth-filled.png'
import HearthunFilled from '../../../../assets/image/hearth-unfilled.png'
import useLikeMovies from '../../../../hooks/useLikeMovies'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import defaultMoviePoster from '../../../../assets/image/default-movie-poster.png';

type Props = {
    id: number
    title: string
    poster_path?: string
    onMovieClick: (id: number) => void
}

const MovieItem = ({ id, title, poster_path, onMovieClick }: Props) => {

    const { isMovieLiked, toggleMovieLiked } = useLikeMovies(id)

    const handleSeeMoreClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation()
        onMovieClick(id)
    };

    const handleHearthClick = () => {
        toggleMovieLiked()
    }

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.target as HTMLImageElement;
        target.src = defaultMoviePoster;
    }

    const moviePoster = poster_path ? poster_path : defaultMoviePoster;

    return (
        <Col xs={12} md={12} xl={12} className={styles.movieItem}>
            <Card.Img
                variant="top"
                src={moviePoster}
                onError={handleImageError}
                alt={title}
                height={330}
                width={210}
            />
            <img
                src={isMovieLiked ? HearthFilled : HearthunFilled}
                alt="hearth-filled"
                className={`hearthImage ${isMovieLiked ? 'likedHeart' : ''}`}
                onClick={handleHearthClick}
            />
            <div className={styles.movieInfoOverlay}>
                <p className={styles.movieTitle}>
                    {title}
                </p>
                <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>
                    Ver más
                </button>
            </div>
        </Col>
    );
};

export default MovieItem;