import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Navbar from '../../components/Navbar'
import Movies from '../../components/Movies'
import ReactPaginate from 'react-paginate'
import styles from './Home.module.css'
import useMoviesResults from '../../state/movies-results'

const Home = () => {

	const [search, setSearch] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const { data, isLoading, error, fetchMovies } = useMoviesResults()

	const movies = useMemo(() => data?.results || null, [data?.results])
	// const page = useMemo(() => data?.page || {}, [data?.page])

	// Arreglar constante total de paginas, esto es porque la api devuelve 1000 paginas pero en realidad la cantidad es menor
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
		if (evt.key === 'Enter' && search) {
			setSearchTerm(search);
			fetchMovies(`&query=${search}`)
		}
	};

	const handlePageClick = useCallback(({ selected }: { selected: number }) => {
		fetchMovies(`&query=${searchTerm}&page=${selected}`)
	}, [searchTerm, fetchMovies]);

  	const renderMovies = () => {
		if (isLoading){
			return <div>Cargando resultados</div>
		}
		if (error) {
			return <div>Ha ocurrido un error</div>
		}

		return (
		<div>
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
			previousLabel="<"
			renderOnZeroPageCount={null}
			/>
		</div>
		)
    
  	}

	return (
		<>
		<Navbar />
		<input 
			type="text" 
			placeholder="Buscar una pelicula..." 
			onChange={handleInputChange}
			onKeyDown={handleInputKeyDown}
			value={search}
			style={{
				fontSize: '15px',
				borderRadius: '5px',
				padding: '5px',
				border: 'none',
				outline: 'none',
			}}
		/>
		{renderMovies()}
		</>
	)
}

export default Home