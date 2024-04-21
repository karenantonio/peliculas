import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import { Suspense } from 'react';

import Home from '../views/Home'
import Detail from '../views/Detail'
import Error from '../views/Error'
import ErrorBoundary from '../components/ErrorBoundary';

import Profile from '../views/Profile'
import MyInfo from '../views/Profile/components/MyInfo'
import LikedMovies from '../views/Profile/components/LikedMovies'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: '/detail/:movieId',
        element: (
            <Suspense fallback={<div>Cargando...</div>}>
                <ErrorBoundary fallback={<div>Ha ocurrido un error al obtener el detalle</div>}>
                    <Detail />
                </ErrorBoundary>
            </Suspense>
        )
    },
    {
        path: '/profile',
        element: <Profile />,
        children: [
            {
                path: 'my-info',
                element: <MyInfo />
            },
            {
                path: 'liked-movies',
                element: <LikedMovies />
            }
        ]
    }
])

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;