import { create } from "zustand";

interface MoviesResults {
    data: any;
    error: Error | null;
    isLoading: boolean;
    fetchMovies: (params?: string) => Promise<void>;
}

// * store pra guardar valores de manera global
const useMoviesResults = create<MoviesResults>((set) => ({
    data: [],
    error: null,
    isLoading: false,
    fetchMovies: async (params?: string) => {
        try {
            console.log('params useMoviesResults',params);
            let url = (params) ? 'https://api.themoviedb.org/3/search/movie' : 'https://api.themoviedb.org/3/trending/movie/day'
            await set(() => ({ isLoading: true }))
            const response = await fetch(`${url}?api_key=${import.meta.env.VITE_THEMOVIEDB_API_KEY}&language=es-ES${params?.length ? params : ''}`)
            const data = await response.json()

            await set(() => ({ data, isLoading: false }))
        } catch (error) {
            await set(() => ({ error: error as Error }))
        }
    }
}))

export default useMoviesResults;