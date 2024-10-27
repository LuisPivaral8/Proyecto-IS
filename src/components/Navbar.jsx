import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username'); // Obtener el nombre de usuario

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/API/logout.php', { withCredentials: true });
            localStorage.removeItem('username'); // Limpiar el nombre de usuario al cerrar sesión
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const styles = {
        navbar: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            zIndex: 1000,
            backgroundColor: '#4CAF50',
            color: '#fff',
            fontSize: '1.1rem',
            height: '60px',
        },
        username: {
            marginRight: '20px',
        },
        logoutButton: {
            backgroundColor: '#d9534f',
            border: 'none',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '4px',
        },
    };

    return (
        <div style={styles.navbar}>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
            <div style={styles.username}>Bienvenido, {username}</div>
        </div>
    );
};

export default Navbar;
