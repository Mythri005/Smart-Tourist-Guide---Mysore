import React from 'react';
import { getHotelSearchLink } from '../services/api';

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '0.5rem',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
    },
    name: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '0.25rem'
    },
    price: {
        fontSize: '0.85rem',
        color: '#27ae60',
        fontWeight: '500'
    },
    rating: {
        fontSize: '0.85rem',
        color: '#f39c12',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.5rem'
    },
    linkHint: {
        fontSize: '0.7rem',
        color: '#3498db',
        marginTop: '0.5rem',
        textAlign: 'right',
        borderTop: '1px solid #ecf0f1',
        paddingTop: '0.5rem'
    }
};

function HotelCard({ hotel }) {
    const handleClick = () => {
        const link = getHotelSearchLink(hotel.name);
        window.open(link, '_blank');
    };

    return (
        <div 
            style={styles.card} 
            onClick={handleClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
        >
            <h4 style={styles.name}>🏨 {hotel.name}</h4>
            <div style={styles.info}>
                <span style={styles.price}>{hotel.price_range || 'Contact for price'}</span>
                <span style={styles.rating}>⭐ {hotel.rating || 'N/A'}</span>
            </div>
            <div style={styles.linkHint}>
                🔗 Click to check prices & reviews on Google
            </div>
        </div>
    );
}

export default HotelCard;