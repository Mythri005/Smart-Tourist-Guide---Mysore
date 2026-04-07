import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import { getDirectionsLink, getGoogleSearchLink } from '../services/api';

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
        fontSize: '1rem',
        transition: 'background-color 0.2s'
    },
    mainContent: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
    },
    imageSection: {
        backgroundColor: '#ecf0f1',
        borderRadius: '12px',
        height: '400px',
        overflow: 'hidden'
    },
    placeImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    detailsSection: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    name: {
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '0.5rem'
    },
    category: {
        display: 'inline-block',
        padding: '0.25rem 1rem',
        backgroundColor: '#3498db',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '0.9rem',
        marginBottom: '1rem'
    },
    infoRow: {
        marginBottom: '0.75rem',
        fontSize: '0.95rem'
    },
    label: {
        fontWeight: '600',
        color: '#2c3e50'
    },
    description: {
        marginTop: '1rem',
        lineHeight: '1.6',
        color: '#555'
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1.5rem',
        flexWrap: 'wrap'
    },
    button: {
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'transform 0.2s'
    },
    mapBtn: {
        backgroundColor: '#27ae60',
        color: '#fff'
    },
    favBtn: {
        backgroundColor: '#e74c3c',
        color: '#fff'
    },
    planBtn: {
        backgroundColor: '#3498db',
        color: '#fff'
    },
    searchBtn: {
        backgroundColor: '#9b59b6',
        color: '#fff'
    },
    nearbySection: {
        marginTop: '2rem'
    },
    sectionTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#2c3e50'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem'
    },
    infoNote: {
        marginTop: '1rem',
        padding: '0.5rem',
        fontSize: '0.8rem',
        color: '#7f8c8d',
        textAlign: 'center',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px'
    }
};

// REAL IMAGES - Large size for details page
const placeImages = {
    "Mysore Palace": "https://images.pexels.com/photos/36476032/pexels-photo-36476032.jpeg",
    "Jaganmohan Palace": "https://imgcld.yatra.com/ytimages/image/upload/v1434118406/Mysore_bbu.jpg",
    "Lalitha Mahal Palace": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/26/1e/39/lalitha-mahal-palace.jpg?w=700&h=-1&s=1",
    "Brindavan Gardens": "https://static.toiimg.com/photo/51680270/.jpg",
    "Chamundeshwari Temple": "https://tripthentic.com/wp-content/uploads/mysore-sri-chamundeshwari-temple.jpg",
    "St Philomena Church": "https://im.hunt.in/cg/mysore/City-Guide/st-philomena-church-2.jpg",
    "Karanji Lake": "https://i0.wp.com/tripthentic.com/wp-content/uploads/karanji-lake-mysore-.jpg?fit=1440%2C960&ssl=1",
    "Mysore Zoo": "https://indiano.travel/wp-content/uploads/2022/04/The-famous-Landmark-Mysore-Zoological-gardens.jpg",
    "Srirangapatna": "https://www.indiatravel.app/wp-content/uploads/2024/03/Sri-Ranganathaswamy-Temple.jpg",
    "Shivanasamudra Falls": "https://karnatakatourism.org/wp-content/uploads/2020/05/Sivanasamudra-falls-3.jpg",
    "Coorg": "https://www.clubmahindra.com/blog/media/section_images/bangalore--3847be2ce8efeaf.jpg"
};

const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mysore_Palace_Morning.jpg/800px-Mysore_Palace_Morning.jpg";

function PlaceDetails({ addToFavorites }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [place, setPlace] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(DEFAULT_IMAGE);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        fetchPlaceDetails();
        fetchNearbyHotels();
        fetchNearbyRestaurants();
    }, [id]);

    const fetchPlaceDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/places/${id}`);
            const data = await response.json();
            setPlace(data);
            setImgSrc(placeImages[data.name] || DEFAULT_IMAGE);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching place details:', error);
            setLoading(false);
        }
    };

    const fetchNearbyHotels = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/hotels/near/${id}`);
            const data = await response.json();
            setHotels(data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const fetchNearbyRestaurants = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/restaurants/near/${id}`);
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleImageError = () => {
        if (!imgError) {
            setImgSrc(DEFAULT_IMAGE);
            setImgError(true);
        }
    };

    const handleViewOnMap = () => {
        const query = encodeURIComponent(place.name + ', ' + (place.location || 'Mysore, Karnataka'));
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
    };

    const handleGetDirections = () => {
        const link = getDirectionsLink(place.name, place.location);
        window.open(link, '_blank');
    };

    const handleGoogleSearch = () => {
        const link = getGoogleSearchLink(place.name + ' Mysore Karnataka');
        window.open(link, '_blank');
    };

    const handlePlanMyVisit = () => {
        navigate(`/planner?place=${id}`);
    };

    if (loading) {
        return <div style={styles.container}>Loading...</div>;
    }

    if (!place) {
        return <div style={styles.container}>Place not found</div>;
    }

    return (
        <div style={styles.container}>
            <button 
                style={styles.backBtn} 
                onClick={() => window.history.back()}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bdc3c7'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ecf0f1'}
            >
                ← Back
            </button>

            <div style={styles.mainContent}>
                <div style={styles.imageSection}>
                    <img 
                        src={imgSrc} 
                        alt={place.name}
                        style={styles.placeImage}
                        onError={handleImageError}
                    />
                </div>
                <div style={styles.detailsSection}>
                    <h1 style={styles.name}>{place.name}</h1>
                    <span style={styles.category}>{place.category}</span>
                    
                    <div style={styles.infoRow}>
                        <span style={styles.label}>⏰ Timings:</span> {place.timings || '9:00 AM - 6:00 PM'}
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>💰 Entry Fee:</span> {place.entry_fee || 'Free entry'}
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>📍 Location:</span> {place.location || 'Mysore, Karnataka'}
                    </div>
                    
                    <div style={styles.description}>
                        <strong>Description:</strong><br />
                        {place.description || 'A beautiful tourist destination in Mysore.'}
                    </div>

                    <div style={styles.buttonGroup}>
                        <button 
                            style={{...styles.button, ...styles.mapBtn}}
                            onClick={handleViewOnMap}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            🗺️ View on Map
                        </button>
                        <button 
                            style={{...styles.button, ...styles.mapBtn}}
                            onClick={handleGetDirections}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            🧭 Get Directions
                        </button>
                        <button 
                            style={{...styles.button, ...styles.searchBtn}}
                            onClick={handleGoogleSearch}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            🔍 Search on Google
                        </button>
                        <button 
                            style={{...styles.button, ...styles.favBtn}}
                            onClick={() => addToFavorites(place.id)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            ❤️ Add to Favorites
                        </button>
                        <button 
                            style={{...styles.button, ...styles.planBtn}}
                            onClick={handlePlanMyVisit}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            🧭 Plan My Visit
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.nearbySection}>
                <h2 style={styles.sectionTitle}>🏨 Hotels Nearby</h2>
                <div style={styles.grid}>
                    {hotels.length > 0 ? (
                        hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)
                    ) : (
                        <p>No hotels listed nearby</p>
                    )}
                </div>
                {hotels.length > 0 && (
                    <div style={styles.infoNote}>
                        💡 Click on any hotel card to see prices and reviews on Google
                    </div>
                )}
            </div>

            <div style={styles.nearbySection}>
                <h2 style={styles.sectionTitle}>🍴 Restaurants Nearby</h2>
                <div style={styles.grid}>
                    {restaurants.length > 0 ? (
                        restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
                    ) : (
                        <p>No restaurants listed nearby</p>
                    )}
                </div>
                {restaurants.length > 0 && (
                    <div style={styles.infoNote}>
                        💡 Click on any restaurant card to see menu and reviews on Google
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlaceDetails;