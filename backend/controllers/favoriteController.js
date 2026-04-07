const db = require('../config/db');

// Get all favorites
exports.getFavorites = (req, res) => {
    const query = `
        SELECT f.*, p.name, p.category, p.image_url 
        FROM favorites f
        JOIN places p ON f.place_id = p.id
        ORDER BY f.created_at DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Add to favorites
exports.addFavorite = (req, res) => {
    const { place_id, user_id = 1 } = req.body;
    
    // Check if already exists
    const checkQuery = 'SELECT * FROM favorites WHERE place_id = ? AND user_id = ?';
    db.get(checkQuery, [place_id, user_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (row) {
            return res.status(400).json({ error: 'Place already in favorites' });
        }
        
        // Add to favorites
        const insertQuery = 'INSERT INTO favorites (place_id, user_id) VALUES (?, ?)';
        db.run(insertQuery, [place_id, user_id], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, message: 'Added to favorites' });
        });
    });
};

// Remove from favorites
exports.removeFavorite = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM favorites WHERE id = ?';
    
    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Favorite not found' });
        }
        res.json({ message: 'Removed from favorites' });
    });
};