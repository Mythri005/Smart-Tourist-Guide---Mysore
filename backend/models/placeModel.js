const db = require('../config/db');

class PlaceModel {
    static getAll(callback) {
        const query = 'SELECT * FROM places';
        db.all(query, [], callback);
    }
    
    static getById(id, callback) {
        const query = 'SELECT * FROM places WHERE id = ?';
        db.get(query, [id], callback);
    }
    
    static search(searchTerm, callback) {
        const query = "SELECT * FROM places WHERE name LIKE ? OR category LIKE ?";
        const term = `%${searchTerm}%`;
        db.all(query, [term, term], callback);
    }
    
    static getByCategory(category, callback) {
        const query = 'SELECT * FROM places WHERE category = ?';
        db.all(query, [category], callback);
    }
}

module.exports = PlaceModel;