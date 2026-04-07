-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- PLACES table (will have 40 entries)
CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    timings TEXT,
    entry_fee TEXT,
    location TEXT,
    image_url TEXT,
    nearby_place TEXT
);

-- HOTELS table (will have 15 entries)
CREATE TABLE IF NOT EXISTS hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    place_id INTEGER,
    price_range TEXT,
    rating REAL,
    image_url TEXT,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

-- RESTAURANTS table (will have 15 entries)
CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    place_id INTEGER,
    cuisine TEXT,
    rating REAL,
    image_url TEXT,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

-- FAVORITES table
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id INTEGER,
    user_id INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

-- ITINERARY PLANS table
CREATE TABLE IF NOT EXISTS itinerary_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_name TEXT NOT NULL,
    morning TEXT,
    afternoon TEXT,
    evening TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_places_name ON places(name);
CREATE INDEX IF NOT EXISTS idx_hotels_place_id ON hotels(place_id);
CREATE INDEX IF NOT EXISTS idx_restaurants_place_id ON restaurants(place_id);