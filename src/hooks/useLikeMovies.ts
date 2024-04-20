import { useState } from "react";
import { LIKED_MOVIES_STORAGE_KEY } from '../utils/constants'

const checkIsMovieLiked = (movieId: number) => {
    const likedMovies = JSON.parse(localStorage.getItem(LIKED_MOVIES_STORAGE_KEY) || '[]')
    return likedMovies.includes(movieId)
}

const useLikeMovies = (movieId: number) => {

    const [isMovieLiked, setIsMovieLiked] = useState(checkIsMovieLiked(movieId))

    const toggleMovieLiked = () => {
        const likedMovies = JSON.parse(localStorage.getItem(LIKED_MOVIES_STORAGE_KEY) || '[]')
        const movieIndex = likedMovies.indexOf(movieId)

        if (movieIndex >= 0) {
            likedMovies.splice(movieIndex, 1)
            setIsMovieLiked(false)
        }else{
            likedMovies.push(movieId)
            setIsMovieLiked(true)
        }

        localStorage.setItem(LIKED_MOVIES_STORAGE_KEY, JSON.stringify(likedMovies))
    }

    return {
        isMovieLiked,
        toggleMovieLiked
    }
   
}

export default useLikeMovies;