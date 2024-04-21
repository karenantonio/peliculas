import { Outlet, useLocation, useNavigate } from "react-router-dom" // * Outlet se utiliza para anidar rutas
import styles from './Profile.module.css'
import Navbar from "../../components/Navbar"

const Profile = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleTabClick = (path: string) => {
        navigate(`/profile/${path}`)
    }

    return (
        <>
        <Navbar />
        <div className={styles.tabsContainer}>
            <span
                className={`${pathname.includes('my-info') ? styles.activeTab : ''} ${styles.tab}`}
                onClick={() => handleTabClick('my-info')}
                style={{ marginRight: 8 }}
            >Mi información</span>
            <span
                className={`${pathname.includes('liked-movies') ? styles.activeTab : ''} ${styles.tab}`}
                onClick={() => handleTabClick('liked-movies')}
            >Peliculas favoritas</span>
        </div>
        <Outlet />
        </>
    )
}

export default Profile