const db = require('../config/db');

// Get all places
exports.getAllPlaces = (req, res) => {
    const query = 'SELECT * FROM places';
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Get place by ID
exports.getPlaceById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM places WHERE id = ?';
    
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.json(row);
    });
};

// Search places
exports.searchPlaces = (req, res) => {
    const { q } = req.query;
    const query = "SELECT * FROM places WHERE name LIKE ? OR category LIKE ?";
    const searchTerm = `%${q}%`;
    
    db.all(query, [searchTerm, searchTerm], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};