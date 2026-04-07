import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceCard from '../components/PlaceCard';

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
    },
    backBtn: {
        backgroundColor: '#ecf0f1',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: '1rem',
        fontSize: '1rem'
    },
    title: {
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#2c3e50'
    },
    searchSection: {
        marginBottom: '2rem'
    },
    searchBar: {
        width: '100%',
        maxWidth: '500px',
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        border: '2px solid #ddd',
        borderRadius: '8px',
        display: 'block'
    },
    categories: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
    },
    categoryBtn: {
        padding: '0.5rem 1.5rem',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s'
    },
    placesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
    },
    loading: {
        textAlign: 'center',
        padding: '2rem'
    }
};

function AllPlaces() {
    const location = useLocation();
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'All');

    const categories = ['All', 'Historical', 'Nature', 'Attractions', 'Religious', 'Nearby'];

    useEffect(() => {
        fetchPlaces();
    }, []);

    useEffect(() => {
        filterPlaces();
    }, [searchTerm, selectedCategory, places]);

    const fetchPlaces = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/places');
            const data = await response.json();
            setPlaces(data);
            setFilteredPlaces(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching places:', error);
            setLoading(false);
        }
    };

    const filterPlaces = () => {
        let filtered = places;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(place => place.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(place => 
                place.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPlaces(filtered);
    };

    return (
        <div style={styles.container}>
            <button style={styles.backBtn} onClick={() => navigate('/')}>
                ← Back to Dashboard
            </button>

            <h1 style={styles.title}>
                {selectedCategory === 'All' ? 'All Tourist Places' : `${selectedCategory} Places`}
            </h1>

            <div style={styles.searchSection}>
                <input
                    type="text"
                    placeholder="🔍 Search for places..."
                    style={styles.searchBar}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div style={styles.categories}>
                {categories.map(category => (
                    <button
                        key={category}
                        style={{
                            ...styles.categoryBtn,
                            backgroundColor: selectedCategory === category ? '#3498db' : '#ecf0f1',
                            color: selectedCategory === category ? '#fff' : '#2c3e50'
                        }}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={styles.loading}>Loading places...</div>
            ) : (
                <>
                    {filteredPlaces.length > 0 ? (
                        <div style={styles.placesGrid}>
                            {filteredPlaces.map(place => (
                                <PlaceCard key={place.id} place={place} />
                            ))}
                        </div>
                    ) : (
                        <div style={styles.loading}>No places found.</div>
                    )}
                </>
            )}
        </div>
    );
}

export default AllPlaces;