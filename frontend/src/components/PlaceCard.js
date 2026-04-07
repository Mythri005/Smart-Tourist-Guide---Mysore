import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaceReviewsLink } from '../services/api';

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer'
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        backgroundColor: '#ecf0f1'
    },
    content: {
        padding: '1rem'
    },
    name: {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#2c3e50'
    },
    category: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        backgroundColor: '#3498db',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '0.8rem',
        marginBottom: '0.5rem'
    },
    location: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        marginBottom: '0.5rem'
    },
    reviewBtn: {
        backgroundColor: '#9b59b6',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        width: '100%',
        transition: 'background-color 0.2s'
    },
    ratingBadge: {
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        backgroundColor: '#f39c12',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '0.7rem',
        marginLeft: '0.5rem'
    }
};

// REAL IMAGES of Mysore places from Wikimedia Commons
const placeImages = {
    // Historical Places
    "Mysore Palace": "https://images.pexels.com/photos/36476032/pexels-photo-36476032.jpeg",
    "Jaganmohan Palace": "https://imgcld.yatra.com/ytimages/image/upload/v1434118406/Mysore_bbu.jpg",
    "Lalitha Mahal Palace": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/26/1e/39/lalitha-mahal-palace.jpg?w=700&h=-1&s=1",
    "Jayalakshmi Vilas Mansion": "https://1.bp.blogspot.com/-FYZqoQMCsU8/Wo2SlbO4KoI/AAAAAAAAm_A/ANqk4qg67TwJ14KIoTb-mfJJDGxUECVDgCLcBGAs/s1600/DSC_0026.JPG",
    "Devaraja Market": "https://tse4.mm.bing.net/th/id/OIP.OCOVQQxUcpz75FIKmZDSnAHaEK?pid=Api&P=0&h=180",
    "Exhibition Grounds": "https://tse3.mm.bing.net/th/id/OIP.1RFSV7MRKqcpL9oM_XoXXwHaEK?pid=Api&P=0&h=180",
    "Railway Museum": "https://tse1.mm.bing.net/th/id/OIP.ViZpKFofa_MIIfclEAL8wAHaD0?pid=Api&P=0&h=180",
    "St Philomena Church": "https://im.hunt.in/cg/mysore/City-Guide/st-philomena-church-2.jpg",
    "Cheluvamba Mansion": "https://im.hunt.in/cg/mysore/City-Guide/cheluvamba.jpg",
    "Government House": "https://static.toiimg.com/photo/51223137/.jpg",
    
    // Nature Places
    "Brindavan Gardens": "https://static.toiimg.com/photo/51680270/.jpg",
    "Karanji Lake": "https://i0.wp.com/tripthentic.com/wp-content/uploads/karanji-lake-mysore-.jpg?fit=1440%2C960&ssl=1",
    "Kukkarahalli Lake": "https://tse2.mm.bing.net/th/id/OIP.GNxXUM1KvkIu8zEEJNdyAgHaE8?pid=Api&P=0&h=180",
    "Lingambudhi Lake": "https://praveenmusafir.com/wp-content/uploads/2024/01/image-45.jpeg",
    "Balmuri Falls": "https://tse4.mm.bing.net/th/id/OIP.T3EzDKFLUtLM1_RWX1XztwHaEC?pid=Api&P=0&h=180",
    "Chamundi Hills Viewpoint": "https://media.istockphoto.com/id/1209452894/photo/the-view-of-the-mysore-palace-foggy-sky-over-mysore-city-taken-on-top-of-chamundi-hills.jpg?s=612x612&w=0&k=20&c=8kbQ7LK-_NWk65qabmdTYKMD94naTVQkkfZbtkvEy-A=",
    "Varuna Lake": "https://tse3.mm.bing.net/th/id/OIP.2eyCoZo4q4KjpwyCvkEPzQHaFj?pid=Api&P=0&h=180",
    "Happy Man Park": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/e7/7d/5a/happy-man-park.jpg?w=700&h=-1&s=1",

    // Religious Places
    "Chamundeshwari Temple": "https://tripthentic.com/wp-content/uploads/mysore-sri-chamundeshwari-temple.jpg",
    "Nandi Statue": "https://tse2.mm.bing.net/th/id/OIP.nNyqDi8vzCamxEkJ2B-dbgHaF0?pid=Api&P=0&h=180",
    "ISKCON Mysore": "https://tse3.mm.bing.net/th/id/OIP.xBs-IsVNqE_lVZajNzRhMQHaE8?pid=Api&P=0&h=180",
    "Sri Ranganathaswamy Temple": "https://tse1.mm.bing.net/th/id/OIP.ZqjSC3p1H3mmm67q962BpQHaD8?pid=Api&P=0&h=180",
    "Lakshmiramana Temple": "https://tse1.mm.bing.net/th/id/OIP.O-3QUqIJza2q5Bq88eokGgAAAA?pid=Api&P=0&h=180",
    "Shweta Varahaswamy Temple": "https://tse4.mm.bing.net/th/id/OIP.zDvBQT4oJlI5h98sEsngLwHaFj?pid=Api&P=0&h=180",
    
    // Attractions
    "Mysore Zoo": "https://indiano.travel/wp-content/uploads/2022/04/The-famous-Landmark-Mysore-Zoological-gardens.jpg",
    "GRS Fantasy Park": "https://tse2.mm.bing.net/th/id/OIP.55k7ZAeAowydnyTzbiZQmAHaE8?pid=Api&P=0&h=180",
    "Sand Sculpture Museum": "https://tse4.mm.bing.net/th/id/OIP.HXJ4bVqTy0ILpjaB2qZO5AHaFP?pid=Api&P=0&h=180",
    "Mall of Mysore": "https://tse2.mm.bing.net/th/id/OIP.RJGO02h44P02LWh6_RtRMwHaCg?pid=Api&P=0&h=180",
    "Melody World Wax Museum": "https://tse3.mm.bing.net/th/id/OIP.lusf92Dwia5X0q4n94IjIwHaE8?pid=Api&P=0&h=180",
    "Planet Earth Aquarium": "https://tse4.mm.bing.net/th/id/OIP.whD4ixr2kjg4gLwVlapb2gHaFj?pid=Api&P=0&h=180",

    // Nearby Places
    "Srirangapatna": "https://www.indiatravel.app/wp-content/uploads/2024/03/Sri-Ranganathaswamy-Temple.jpg",
    "Ranganathittu Bird Sanctuary": "https://tse2.mm.bing.net/th/id/OIP.ZRAunEPchQUWlV8UVi4K2wHaE8?pid=Api&P=0&h=180",
    "Shivanasamudra Falls": "https://karnatakatourism.org/wp-content/uploads/2020/05/Sivanasamudra-falls-3.jpg",
    "Coorg": "https://www.clubmahindra.com/blog/media/section_images/bangalore--3847be2ce8efeaf.jpg",
    "Bandipur National Park": "https://tse2.mm.bing.net/th/id/OIP.Y5V_gqzlO0mBcV9J-HKjwQHaEZ?pid=Api&P=0&h=180",
    "Nagarhole National Park": "https://tse4.mm.bing.net/th/id/OIP.fQM_TG6kM4tF4Uxkv7xDpwHaEW?pid=Api&P=0&h=180",
    "Kabini": "https://tse3.mm.bing.net/th/id/OIP.YylKALzHZQCbPp6ux3vcMQHaDt?pid=Api&P=0&h=180",
    "Talakadu": "https://tse3.mm.bing.net/th/id/OIP._bmliTn9mDbXB0KGKVWYrgHaDt?pid=Api&P=0&h=180",
    "BR Hills":"https://tse2.mm.bing.net/th/id/OIP.l8YsBo1zL220GYwVexDmeQHaE8?pid=Api&P=0&h=180",
    "Himavad Gopalaswamy Betta": "https://tse3.mm.bing.net/th/id/OIP.yNcTnACRo_HuLUWC4mfEdQHaFj?pid=Api&P=0&h=180"
};

// Default image (Mysore Palace) if place not found
const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mysore_Palace_Morning.jpg/600px-Mysore_Palace_Morning.jpg";

function PlaceCard({ place }) {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(placeImages[place.name] || DEFAULT_IMAGE);
    const [imgError, setImgError] = useState(false);

    const getCategoryColor = (category) => {
        switch(category) {
            case 'Historical': return '#e74c3c';
            case 'Nature': return '#27ae60';
            case 'Religious': return '#f39c12';
            case 'Attractions': return '#e67e22';
            case 'Nearby': return '#1abc9c';
            default: return '#3498db';
        }
    };

    const handleCardClick = () => {
        navigate(`/place/${place.id}`);
    };

    const handleViewReviews = (e) => {
        e.stopPropagation();
        const link = getPlaceReviewsLink(place.name);
        window.open(link, '_blank');
    };

    const handleImageError = () => {
        if (!imgError) {
            setImgSrc(DEFAULT_IMAGE);
            setImgError(true);
        }
    };

    const getPlaceRating = (placeName) => {
        const ratings = {
            "Mysore Palace": 4.8,
            "Chamundeshwari Temple": 4.7,
            "Brindavan Gardens": 4.6,
            "Mysore Zoo": 4.5,
            "St Philomena Church": 4.6,
            "Srirangapatna": 4.4,
            "Karanji Lake": 4.3,
            "Jaganmohan Palace": 4.4,
            "Lalitha Mahal Palace": 4.5,
            "Coorg": 4.7,
            "Bandipur National Park": 4.6,
            "Nagarhole National Park": 4.5,
            "Ranganathittu Bird Sanctuary": 4.4,
            "Shivanasamudra Falls": 4.5,
            "ISKCON Mysore": 4.3
        };
        return ratings[placeName] || (4.0 + Math.random() * 0.8).toFixed(1);
    };

    const rating = getPlaceRating(place.name);

    return (
        <div 
            style={styles.card} 
            onClick={handleCardClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
            }} 
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
        >
            <img 
                src={imgSrc} 
                alt={place.name}
                style={styles.image}
                onError={handleImageError}
                loading="lazy"
            />
            <div style={styles.content}>
                <div>
                    <span style={{...styles.category, backgroundColor: getCategoryColor(place.category)}}>
                        {place.category}
                    </span>
                    <span style={styles.ratingBadge}>⭐ {rating}</span>
                </div>
                <h3 style={styles.name}>{place.name}</h3>
                <div style={styles.location}>
                    📍 {place.location || 'Mysore, Karnataka'}
                </div>
                <button 
                    style={styles.reviewBtn}
                    onClick={handleViewReviews}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8e44ad'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9b59b6'}
                >
                    ⭐ View Reviews on Google
                </button>
            </div>
        </div>
    );
}

export default PlaceCard;