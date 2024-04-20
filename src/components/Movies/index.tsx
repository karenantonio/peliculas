import MovieItem from "./components/MovieItem"
import { useNavigate } from "react-router-dom";
import { memo } from "react";

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

        return movies.map((movieItem: { id: number; title: string; overview: string | undefined; poster_path: string | undefined}) => (
            <MovieItem 
                key={`movie-item-${movieItem.id}`}
                id={movieItem.id} 
                title={movieItem.title}
                overview={movieItem.overview ?? ''} 
                poster_path={`https://image.tmdb.org/t/p/original${movieItem.poster_path}`}
                onMovieClick={handleMovieItemClick}
            />
        ))
    }

    return (
        <div>
            <h1>{searchTerm ? `Resultados de la búsqueda`: `Tendencias del día`}</h1>
            {renderMovies()}
        </div>
    );
};

export default memo(Movies);