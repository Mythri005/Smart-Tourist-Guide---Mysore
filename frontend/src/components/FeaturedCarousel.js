import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer'
    },
    slide: {
        position: 'relative',
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '2rem 1rem 1rem',
        textAlign: 'center'
    },
    title: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '0.25rem'
    },
    category: {
        color: '#f39c12',
        fontSize: '0.9rem'
    },
    prevBtn: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'background-color 0.3s'
    },
    nextBtn: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'background-color 0.3s'
    },
    dots: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },
    activeDot: {
        backgroundColor: '#fff',
        width: '20px',
        borderRadius: '10px'
    }
};

const featuredPlaces = [
    { id: 1, name: "Mysore Palace", category: "Historical", image: "https://picsum.photos/id/104/800/300" },
    { id: 2, name: "Brindavan Gardens", category: "Nature", image: "https://picsum.photos/id/15/800/300" },
    { id: 3, name: "Chamundeshwari Temple", category: "Religious", image: "https://picsum.photos/id/95/800/300" },
    { id: 4, name: "Mysore Zoo", category: "Attractions", image: "https://picsum.photos/id/141/800/300" },
    { id: 5, name: "Coorg", category: "Nearby", image: "https://picsum.photos/id/50/800/300" }
];

function FeaturedCarousel() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredPlaces.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + featuredPlaces.length) % featuredPlaces.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredPlaces.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleSlideClick = () => {
        navigate(`/place/${featuredPlaces[currentIndex].id}`);
    };

    const currentPlace = featuredPlaces[currentIndex];

    return (
        <div style={styles.container}>
            <button 
                style={styles.prevBtn} 
                onClick={goToPrev}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
            >
                ‹
            </button>
            <button 
                style={styles.nextBtn} 
                onClick={goToNext}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
            >
                ›
            </button>
            
            <div style={styles.slide} onClick={handleSlideClick}>
                <img 
                    src={currentPlace.image} 
                    alt={currentPlace.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={styles.overlay}>
                    <h3 style={styles.title}>{currentPlace.name}</h3>
                    <p style={styles.category}>{currentPlace.category}</p>
                </div>
            </div>

            <div style={styles.dots}>
                {featuredPlaces.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.dot,
                            ...(index === currentIndex ? styles.activeDot : {})
                        }}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default FeaturedCarousel;