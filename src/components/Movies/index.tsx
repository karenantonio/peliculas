import MovieItem from "./components/MovieItem"
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Movies.module.css'

type Props = {
    searchTerm: string;
    movies: any;
}

const Movies = ({ searchTerm, movies }: Props) => {

    const navigate = useNavigate()

    const handleMovieItemClick = (id: number) => {
        navigate(`/detail/${id}`)
    }

    const renderMovies = () => {
        return (
          <Row xs={2} md={3} xl={5} className="g-4 p-0 m-0">
            {movies.map((movieItem: { id: number; title: string; poster_path: string | undefined }) => (
              <Col key={movieItem.id}>
                <Card className={styles.movieCard} style={{ padding: 0, margin:'auto' }}>
                  <MovieItem
                    key={`movie-item-${movieItem.id}`}
                    id={movieItem.id}
                    title={movieItem.title}
                    poster_path={`https://image.tmdb.org/t/p/original${movieItem.poster_path}`}
                    onMovieClick={handleMovieItemClick}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        );
      };

    return (
        <div>
            <h1 className={styles.pageTitle}>{searchTerm ? `Resultados de la búsqueda`: `Tendencias del día`}</h1>
            {renderMovies()}
        </div>
    );
};

export default Movies;