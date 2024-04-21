import { Link } from "react-router-dom";
import styles from './Navbar.module.css'

const Navbar = () => {

    return (
        <div className={styles.containerNavbar}>
            <Link to='/' className={styles.linkNavbar}>Películas</Link>
            <Link to="/profile/my-info" className={styles.linkNavbar}>Mi perfil</Link>
        </div>
    );
};

export default Navbar;