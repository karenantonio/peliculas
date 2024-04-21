import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from '../../components/Navbar'
import Movies from '../../components/Movies'
import ReactPaginate from 'react-paginate'
import styles from './Home.module.css'
import useMoviesResults from '../../state/useMoviesResults'

const Home = () => {

	const [search, setSearch] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(0);
	const { data, isLoading, error, fetchMovies } = useMoviesResults()

	const movies = data?.results || null

	// TODO: Arreglar constante total de paginas, esto es porque la api devuelve 1000 paginas pero en realidad la cantidad es menor (buscar alguna solucion)
	let total_pages = data?.total_pages || {};
	if (total_pages === 1000) {
		total_pages = 500;
	}

	const fetchMyMoviesRef = useRef(fetchMovies)
	fetchMyMoviesRef.current = fetchMovies

	useEffect(() => {
		fetchMyMoviesRef.current()
	}, []);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(evt.target.value);
	}

	const handleInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		if (evt.key !== 'Enter') return;
	
		let searchTermToUse: string;
		if (search.length > 0) {
			searchTermToUse = search;
		} else {
			searchTermToUse = '';
		}
	
		setSearchTerm(searchTermToUse);
		setCurrentPage(0);
		fetchMovies(searchTermToUse);
	};

	const handlePageClick = useCallback(({ selected }: { selected: number }) => {
		setCurrentPage(selected);
		fetchMovies(search, selected); 
	  }, [search, fetchMovies]);

  	const renderMovies = () => {
		if (isLoading){
			return (
				<div className="loading centerContent">
					Cargando resultados
				</div>
			)
		}
		if (error) {
			return <div>Ha ocurrido un error</div>
		}

		return (
			<>
			{movies && <Movies searchTerm={searchTerm} movies={movies} /> || ''}
			<ReactPaginate
				className={styles.pagination}
				pageClassName={styles.page}
				previousClassName={styles.previous}
				nextClassName={styles.next}
				activeClassName={styles.activePage}
				disabledClassName={styles.disabledPage}
				breakLabel="..."
				nextLabel=">"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={total_pages}
				forcePage={currentPage}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
			</>
		)
  	}

	return (
		<>
		<Navbar />
		<div className="row p-0 m-0">
			<div className="col-12 p-0 m-0">
				<input 
					type="text" 
					placeholder="Buscar una pelicula..." 
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					value={search}
					className={styles.searchInput}
				/>
			</div>
		</div>
		{renderMovies()}
		</>
	)
}

export default Home