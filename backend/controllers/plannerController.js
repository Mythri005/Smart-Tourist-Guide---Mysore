const db = require('../config/db');

// Get itinerary for a place
exports.getItinerary = (req, res) => {
    const { placeId } = req.params;
    
    // First get the place name
    const placeQuery = 'SELECT name FROM places WHERE id = ?';
    
    db.get(placeQuery, [placeId], (err, place) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        
        // Get itinerary plan
        const itineraryQuery = 'SELECT * FROM itinerary_plans WHERE place_name LIKE ?';
        db.get(itineraryQuery, [`%${place.name}%`], (err, itinerary) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Default itinerary if not found in database
            if (!itinerary) {
                const defaultItinerary = {
                    morning: 'Visit the main attraction',
                    afternoon: 'Explore nearby places',
                    evening: 'Enjoy local cuisine and shopping'
                };
                return res.json(defaultItinerary);
            }
            
            res.json({
                morning: itinerary.morning,
                afternoon: itinerary.afternoon,
                evening: itinerary.evening
            });
        });
    });
};