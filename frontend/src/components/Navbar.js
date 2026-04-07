import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
    navbar: {
        backgroundColor: '#2c3e50',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    logo: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none'
    },
    navLinks: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.3s'
    },
    activeLink: {
        backgroundColor: '#3498db',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '4px'
    },
    favoriteBadge: {
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '0.7rem',
        fontWeight: 'bold'
    }
};

function Navbar({ favoriteCount }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.logo}>
                🏰 Mysore Tourist Guide
            </Link>
            <div style={styles.navLinks}>
                <Link 
                    to="/" 
                    style={isActive('/') ? styles.activeLink : styles.link}
                >
                    Home
                </Link>
                <Link 
                    to="/favorites" 
                    style={isActive('/favorites') ? styles.activeLink : styles.link}
                >
                    <span style={styles.favoriteBadge}>
                        ❤️ Favorites
                        {favoriteCount > 0 && <span style={styles.badge}>{favoriteCount}</span>}
                    </span>
                </Link>
                <Link 
                    to="/planner" 
                    style={isActive('/planner') ? styles.activeLink : styles.link}
                >
                    📅 Planner
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;