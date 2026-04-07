import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
    },
    title: {
        fontSize: '2rem',
        marginBottom: '2rem',
        color: '#2c3e50'
    },
    favoritesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s'
    },
    image: {
        height: '150px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        marginBottom: '1rem'
    },
    name: {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '0.5rem'
    },
    category: {
        color: '#7f8c8d',
        fontSize: '0.9rem',
        marginBottom: '0.5rem'
    },
    removeBtn: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '0.5rem',
        width: '100%'
    },
    empty: {
        textAlign: 'center',
        padding: '3rem',
        fontSize: '1.2rem',
        color: '#7f8c8d'
    }
};

function Favorites({ favorites, removeFromFavorites }) {
    const navigate = useNavigate();

    const handleCardClick = (placeId) => {
        navigate(`/place/${placeId}`);
    };

    const handleRemove = (e, id) => {
        e.stopPropagation();
        removeFromFavorites(id);
    };

    if (favorites.length === 0) {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>❤️ My Favorites</h1>
                <div style={styles.empty}>
                    No favorites yet. Start adding places you love!
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>❤️ My Favorites ({favorites.length})</h1>
            <div style={styles.favoritesGrid}>
                {favorites.map(fav => (
                    <div 
                        key={fav.id} 
                        style={styles.card}
                        onClick={() => handleCardClick(fav.place_id)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={styles.image}>
                            🏛️
                        </div>
                        <h3 style={styles.name}>{fav.name}</h3>
                        <div style={styles.category}>{fav.category}</div>
                        <button 
                            style={styles.removeBtn}
                            onClick={(e) => handleRemove(e, fav.id)}
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;