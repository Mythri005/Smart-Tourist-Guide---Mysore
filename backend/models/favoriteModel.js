const db = require('../config/db');

class FavoriteModel {
    static getAll(userId = 1, callback) {
        const query = `
            SELECT f.*, p.name, p.category, p.image_url, p.description
            FROM favorites f
            JOIN places p ON f.place_id = p.id
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC
        `;
        db.all(query, [userId], callback);
    }
    
    static add(placeId, userId = 1, callback) {
        const query = 'INSERT INTO favorites (place_id, user_id) VALUES (?, ?)';
        db.run(query, [placeId, userId], callback);
    }
    
    static remove(id, callback) {
        const query = 'DELETE FROM favorites WHERE id = ?';
        db.run(query, [id], callback);
    }
    
    static exists(placeId, userId = 1, callback) {
        const query = 'SELECT * FROM favorites WHERE place_id = ? AND user_id = ?';
        db.get(query, [placeId, userId], callback);
    }
}

module.exports = FavoriteModel;