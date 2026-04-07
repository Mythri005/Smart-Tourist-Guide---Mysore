const db = require('../config/db');

// Get restaurants by place ID
exports.getRestaurantsByPlace = (req, res) => {
    const { placeId } = req.params;
    const query = 'SELECT * FROM restaurants WHERE place_id = ?';
    
    db.all(query, [placeId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};