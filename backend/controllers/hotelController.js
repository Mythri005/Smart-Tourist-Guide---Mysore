const db = require('../config/db');

// Get hotels by place ID
exports.getHotelsByPlace = (req, res) => {
    const { placeId } = req.params;
    const query = 'SELECT * FROM hotels WHERE place_id = ?';
    
    db.all(query, [placeId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};