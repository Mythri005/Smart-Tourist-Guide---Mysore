    const db = require('../config/db');

class RestaurantModel {
    static getByPlaceId(placeId, callback) {
        const query = 'SELECT * FROM restaurants WHERE place_id = ?';
        db.all(query, [placeId], callback);
    }
    
    static getAll(callback) {
        const query = 'SELECT * FROM restaurants';
        db.all(query, [], callback);
    }
}

module.exports = RestaurantModel;