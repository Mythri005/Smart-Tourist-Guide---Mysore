const db = require('../config/db');

class HotelModel {
    static getByPlaceId(placeId, callback) {
        const query = 'SELECT * FROM hotels WHERE place_id = ?';
        db.all(query, [placeId], callback);
    }
    
    static getAll(callback) {
        const query = 'SELECT * FROM hotels';
        db.all(query, [], callback);
    }
}

module.exports = HotelModel;