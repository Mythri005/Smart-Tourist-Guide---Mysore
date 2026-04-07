// Base URL for API calls
const API_BASE_URL = 'http://localhost:5000/api';

// API service for making backend calls
const api = {
    // PLACES
    getAllPlaces: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/places`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching places:', error);
            throw error;
        }
    },

    getPlaceById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/places/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching place:', error);
            throw error;
        }
    },

    searchPlaces: async (searchTerm) => {
        try {
            const response = await fetch(`${API_BASE_URL}/places/search?q=${encodeURIComponent(searchTerm)}`);
            return await response.json();
        } catch (error) {
            console.error('Error searching places:', error);
            throw error;
        }
    },

    // HOTELS
    getHotelsNearPlace: async (placeId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/hotels/near/${placeId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching hotels:', error);
            throw error;
        }
    },

    // RESTAURANTS
    getRestaurantsNearPlace: async (placeId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/restaurants/near/${placeId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error;
        }
    },

    // FAVORITES
    getFavorites: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/favorites`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching favorites:', error);
            throw error;
        }
    },

    addToFavorites: async (placeId, userId = 1) => {
        try {
            const response = await fetch(`${API_BASE_URL}/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ place_id: placeId, user_id: userId }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding to favorites:', error);
            throw error;
        }
    },

    removeFromFavorites: async (favoriteId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/favorites/${favoriteId}`, {
                method: 'DELETE',
            });
            return await response.json();
        } catch (error) {
            console.error('Error removing from favorites:', error);
            throw error;
        }
    },

    // PLANNER
    getItinerary: async (placeId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/planner/itinerary/${placeId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching itinerary:', error);
            throw error;
        }
    },
};

// ==================== HELPER FUNCTIONS ====================

// Helper function to generate Google search links
export const getGoogleSearchLink = (name) => {
    return `https://www.google.com/search?q=${encodeURIComponent(name)}`;
};

// Helper function to get Google Maps link
export const getGoogleMapsLink = (placeName, location) => {
    const query = encodeURIComponent(`${placeName}, ${location || 'Mysore, Karnataka'}`);
    return `https://www.google.com/maps/search/${query}`;
};

// Helper function to get reviews link
export const getReviewsLink = (name) => {
    return `https://www.google.com/search?q=${encodeURIComponent(name + ' reviews')}`;
};

// Helper function to get place reviews link (specifically for tourist places)
export const getPlaceReviewsLink = (placeName) => {
    return `https://www.google.com/search?q=${encodeURIComponent(placeName + ' Mysore tourist reviews rating')}`;
};

// Helper function to get hotel booking/search link
export const getHotelSearchLink = (hotelName) => {
    return `https://www.google.com/search?q=${encodeURIComponent(hotelName + ' Mysore price')}`;
};

// Helper function to get restaurant menu/review link
export const getRestaurantLink = (restaurantName) => {
    return `https://www.google.com/search?q=${encodeURIComponent(restaurantName + ' Mysore menu')}`;
};

// Helper function to get directions link
export const getDirectionsLink = (placeName, location) => {
    const destination = encodeURIComponent(`${placeName}, ${location || 'Mysore, Karnataka'}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
};

// Top recommended places (based on popularity)
export const TOP_RECOMMENDED_PLACES = [
    "Mysore Palace",
    "Chamundeshwari Temple",
    "Brindavan Gardens",
    "Mysore Zoo",
    "St Philomena Church",
    "Srirangapatna",
    "Karanji Lake",
    "Jaganmohan Palace",
    "Lalitha Mahal Palace",
    "Coorg"
];

export default api;