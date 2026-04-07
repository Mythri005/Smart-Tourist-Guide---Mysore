import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';
import DashboardCard from '../components/DashboardCard';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { TOP_RECOMMENDED_PLACES } from '../services/api';

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
    },
    hero: {
        textAlign: 'center',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #3498db, #2c3e50)',
        color: '#fff',
        borderRadius: '12px',
        marginBottom: '2rem'
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '1rem'
    },
    subtitle: {
        fontSize: '1.2rem',
        opacity: 0.9
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#2c3e50',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    viewAllBtn: {
        marginLeft: 'auto',
        backgroundColor: 'transparent',
        border: '1px solid #3498db',
        color: '#3498db',
        padding: '0.25rem 1rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        transition: 'all 0.3s'
    },
    placesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '1rem'
    },
    categorySection: {
        marginTop: '2rem'
    },
    quickCategories: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
    },
    quickCatBtn: {
        padding: '1rem',
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    loading: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem'
    }
};

function Home() {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [recommendedPlaces, setRecommendedPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/places');
            const data = await response.json();
            setPlaces(data);
            const recommended = data.filter(place => TOP_RECOMMENDED_PLACES.includes(place.name));
            setRecommendedPlaces(recommended.slice(0, 6)); // Show only first 6
            setLoading(false);
        } catch (error) {
            console.error('Error fetching places:', error);
            setLoading(false);
        }
    };

    const getCategoryCount = (category) => {
        return places.filter(place => place.category === category).length;
    };

    const handleCategoryClick = (category) => {
        navigate('/places', { state: { category } });
    };

    const categories = [
        { name: 'Historical', icon: '🏛️', color: '#e74c3c', count: getCategoryCount('Historical') },
        { name: 'Nature', icon: '🌿', color: '#27ae60', count: getCategoryCount('Nature') },
        { name: 'Attractions', icon: '🎢', color: '#e67e22', count: getCategoryCount('Attractions') },
        { name: 'Religious', icon: '🛕', color: '#f39c12', count: getCategoryCount('Religious') },
        { name: 'Nearby', icon: '🏞️', color: '#1abc9c', count: getCategoryCount('Nearby') }
    ];

    const stats = [
        { icon: '🏰', value: places.length, label: 'Tourist Places', color: '#3498db' },
        { icon: '⭐', value: '4.5', label: 'Average Rating', color: '#f39c12' },
        { icon: '🏨', value: '15+', label: 'Hotels', color: '#27ae60' },
        { icon: '🍴', value: '15+', label: 'Restaurants', color: '#e74c3c' }
    ];

    if (loading) {
        return <div style={styles.loading}>Loading dashboard...</div>;
    }

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <h1 style={styles.title}>✨ Welcome to Mysore ✨</h1>
                <p style={styles.subtitle}>Discover the cultural heritage of the Royal City</p>
            </div>

            {/* Stats Dashboard */}
            <div style={styles.dashboardGrid}>
                {stats.map((stat, index) => (
                    <DashboardCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Featured Carousel */}
            <div style={styles.categorySection}>
                <h2 style={styles.sectionTitle}>🌟 Featured Attractions</h2>
                <FeaturedCarousel />
            </div>

            {/* Quick Categories */}
            <div style={styles.categorySection}>
                <h2 style={styles.sectionTitle}>📂 Explore by Category</h2>
                <div style={styles.quickCategories}>
                    {categories.map(cat => (
                        <button
                            key={cat.name}
                            style={styles.quickCatBtn}
                            onClick={() => handleCategoryClick(cat.name)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '2rem' }}>{cat.icon}</div>
                            <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{cat.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>{cat.count} places</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Recommended Places */}
            <div style={styles.categorySection}>
                <div style={styles.sectionTitle}>
                    ⭐ Top Recommended Places
                    <button 
                        style={styles.viewAllBtn}
                        onClick={() => navigate('/places')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#3498db';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#3498db';
                        }}
                    >
                        View All →
                    </button>
                </div>
                <div style={styles.placesGrid}>
                    {recommendedPlaces.map(place => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;