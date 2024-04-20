import { useRouteError } from "react-router-dom"

interface RouteError {
    status: number;
    data: any;
    message: string;
}

const Error = () => {

    const error = useRouteError() as RouteError;

    return (
        <div>
            <h1>{error.status || error.message}</h1>
            <h2>Página no encontrada</h2>
            <h3>{error.data}</h3>
        </div>
    )

}

export default Error