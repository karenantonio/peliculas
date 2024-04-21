import { create } from "zustand";

interface MoviesResults {
    data: any;
    error: Error | null;
    isLoading: boolean;
    fetchMovies: (searchTerm?: string, page?: number) => Promise<void>;
}

// * store pra guardar valores de manera global
const useMoviesResults = create<MoviesResults>((set) => ({
    data: [],
    error: null,
    isLoading: false,
    fetchMovies: async (searchTerm?: string, page?: number) => {
        try {
            
            let url = searchTerm ? 'https://api.themoviedb.org/3/search/movie' : 'https://api.themoviedb.org/3/trending/movie/day';

            let params = '';
            if (searchTerm) {
                params += `&query=${searchTerm}`;
            }
            if (page) {
                params += `&page=${page+1}`;
            }

            await set(() => ({ isLoading: true }))

            const response = await fetch(`${url}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&include_adult=false&language=es-ES${params}`);
            
            const data = await response.json()

            await set(() => ({ data, isLoading: false }))
        } catch (error) {
            await set(() => ({ error: error as Error }))
        }
    }
}))

export default useMoviesResults;