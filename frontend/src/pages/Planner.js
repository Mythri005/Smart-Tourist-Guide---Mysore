import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';  // ADD this

const styles = {
    // ... (keep all your existing styles, they are correct)
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
    },
    title: {
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#2c3e50'
    },
    subtitle: {
        color: '#7f8c8d',
        marginBottom: '2rem'
    },
    selector: {
        marginBottom: '2rem'
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600'
    },
    select: {
        width: '100%',
        maxWidth: '400px',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '2px solid #ddd',
        borderRadius: '8px'
    },
    itineraryCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    timeSlot: {
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    },
    timeIcon: {
        fontSize: '1.5rem',
        marginRight: '0.5rem'
    },
    timeTitle: {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '0.5rem'
    },
    planText: {
        fontSize: '1rem',
        color: '#555'
    },
    loading: {
        textAlign: 'center',
        padding: '2rem'
    }
};

function Planner() {
    const [searchParams] = useSearchParams();  // ADD this to get URL params
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPlaces();
    }, []);

    // Auto-select place if coming from PlaceDetails page
    useEffect(() => {
        const placeId = searchParams.get('place');
        if (placeId && places.length > 0) {
            setSelectedPlace(placeId);
            fetchItinerary(placeId);
        }
    }, [places, searchParams]);

    const fetchPlaces = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/places');
            const data = await response.json();
            setPlaces(data);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    const fetchItinerary = async (placeId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/planner/itinerary/${placeId}`);
            const data = await response.json();
            setItinerary(data);
        } catch (error) {
            console.error('Error fetching itinerary:', error);
        }
        setLoading(false);
    };

    const handlePlaceSelect = async (e) => {
        const placeId = e.target.value;
        setSelectedPlace(placeId);
        
        if (placeId) {
            await fetchItinerary(placeId);
        } else {
            setItinerary(null);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📅 Smart Itinerary Planner</h1>
            <p style={styles.subtitle}>Get a personalized one-day plan for your chosen destination</p>

            <div style={styles.selector}>
                <label style={styles.label}>Select a place to plan your visit:</label>
                <select style={styles.select} value={selectedPlace} onChange={handlePlaceSelect}>
                    <option value="">-- Choose a destination --</option>
                    {places.map(place => (
                        <option key={place.id} value={place.id}>
                            {place.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <div style={styles.loading}>Generating your itinerary...</div>}

            {itinerary && !loading && (
                <div style={styles.itineraryCard}>
                    <h2>✨ Your One-Day Plan ✨</h2>
                    
                    <div style={styles.timeSlot}>
                        <div>
                            <span style={styles.timeIcon}>🌅</span>
                            <span style={styles.timeTitle}>Morning (9:00 AM - 12:00 PM)</span>
                        </div>
                        <p style={styles.planText}>{itinerary.morning || 'Start your day exploring the main attraction'}</p>
                    </div>

                    <div style={styles.timeSlot}>
                        <div>
                            <span style={styles.timeIcon}>🌞</span>
                            <span style={styles.timeTitle}>Afternoon (12:00 PM - 4:00 PM)</span>
                        </div>
                        <p style={styles.planText}>{itinerary.afternoon || 'Enjoy lunch and visit nearby attractions'}</p>
                    </div>

                    <div style={styles.timeSlot}>
                        <div>
                            <span style={styles.timeIcon}>🌙</span>
                            <span style={styles.timeTitle}>Evening (4:00 PM onwards)</span>
                        </div>
                        <p style={styles.planText}>{itinerary.evening || 'Relax and explore local markets'}</p>
                    </div>

                    <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '8px'}}>
                        <strong>💡 Pro Tip:</strong> Start early to make the most of your day!
                    </div>
                </div>
            )}
        </div>
    );
}

export default Planner;