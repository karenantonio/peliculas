import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div style={{
            margin: '0px',
            backgroundColor: 'gray',
            // width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'center',
            padding: '20px',
            fontSize: '20px',
            color: 'white',
            fontWeight: 'bold'
        }}>
            <Link to='/' style={{ 
                // marginLeft: '10px',
                color: 'white',
                textDecoration: 'none'
            }}>Peliculas</Link>
            
            <Link to="/profile/my-info" style={{ 
                // marginLeft: '10px',
                color: 'white',
                textDecoration: 'none'
            }}>Mi perfil</Link>
        </div>
    );
};

export default Navbar;