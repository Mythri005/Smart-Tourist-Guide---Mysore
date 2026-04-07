const db = require('../config/db');
const fs = require('fs');
const path = require('path');

// ==================== DATA DEFINITIONS ====================

// 40 PLACES
const places = [
    // Historical (10)
    { name: "Mysore Palace", category: "Historical", description: "A breathtaking palace and former royal residence of the Wadiyar dynasty.", timings: "10:00 AM - 5:30 PM", entry_fee: "₹70 (Indians), ₹200 (Foreigners)", location: "Mysore, Karnataka" },
    { name: "Jaganmohan Palace", category: "Historical", description: "Art gallery with rare artifacts and paintings.", timings: "8:30 AM - 5:30 PM", entry_fee: "₹50", location: "Jaganmohan Palace Rd, Mysore" },
    { name: "Lalitha Mahal Palace", category: "Historical", description: "Luxury heritage hotel and palace.", timings: "10:00 AM - 6:00 PM", entry_fee: "₹200", location: "Lalitha Mahal Rd, Mysore" },
    { name: "Jayalakshmi Vilas Mansion", category: "Historical", description: "Beautiful mansion with antique collections.", timings: "9:30 AM - 5:00 PM", entry_fee: "₹50", location: "Manasagangothri, Mysore" },
    { name: "Devaraja Market", category: "Historical", description: "Traditional market with flowers, spices, and local goods.", timings: "8:00 AM - 8:00 PM", entry_fee: "Free", location: "Devaraja Market, Mysore" },
    { name: "Exhibition Grounds", category: "Historical", description: "Annual exhibition showcasing culture and products.", timings: "2:00 PM - 10:00 PM", entry_fee: "₹30", location: "Doddakere Maidan, Mysore" },
    { name: "Cheluvamba Mansion", category: "Historical", description: "Heritage building now part of IISER campus.", timings: "By permission only", entry_fee: "Free", location: "Manasagangothri, Mysore" },
    { name: "Railway Museum", category: "Historical", description: "Museum with vintage locomotives.", timings: "10:00 AM - 5:30 PM", entry_fee: "₹50", location: "Near Railway Station, Mysore" },
    { name: "St Philomena Church", category: "Historical", description: "One of the largest churches in India.", timings: "5:00 AM - 6:00 PM", entry_fee: "Free", location: "Ashoka Road, Mysore" },
    { name: "Government House", category: "Historical", description: "Official residence of the Governor.", timings: "By appointment", entry_fee: "Restricted", location: "Raj Bhavan, Mysore" },
    
    // Nature (8)
    { name: "Brindavan Gardens", category: "Nature", description: "Beautiful terraced gardens with musical fountain.", timings: "6:30 AM - 9:00 PM", entry_fee: "₹50", location: "KRS Dam, Mysore" },
    { name: "Karanji Lake", category: "Nature", description: "Lake with walkway and aviary.", timings: "8:30 AM - 5:30 PM", entry_fee: "₹10", location: "Chamundi Hill Rd, Mysore" },
    { name: "Kukkarahalli Lake", category: "Nature", description: "Popular lake for walking and bird watching.", timings: "6:00 AM - 6:00 PM", entry_fee: "Free", location: "Kukkarahalli, Mysore" },
    { name: "Lingambudhi Lake", category: "Nature", description: "Peaceful lake with walking path.", timings: "6:00 AM - 6:00 PM", entry_fee: "Free", location: "Hunsur Road, Mysore" },
    { name: "Balmuri Falls", category: "Nature", description: "Small waterfall on Kaveri river.", timings: "8:00 AM - 6:00 PM", entry_fee: "Free", location: "Balmuri, Mysore" },
    { name: "Varuna Lake", category: "Nature", description: "Serene lake perfect for picnics.", timings: "Sunrise to Sunset", entry_fee: "Free", location: "Varuna, Mysore" },
    { name: "Chamundi Hills Viewpoint", category: "Nature", description: "Scenic viewpoint overlooking Mysore city.", timings: "Sunrise to Sunset", entry_fee: "Free", location: "Chamundi Hills, Mysore" },
    { name: "Happy Man Park", category: "Nature", description: "Peaceful park with walking trails.", timings: "6:00 AM - 7:00 PM", entry_fee: "Free", location: "Vijayanagar, Mysore" },
    
    // Attractions (6)
    { name: "Mysore Zoo", category: "Attractions", description: "One of the oldest zoos in India.", timings: "8:30 AM - 5:30 PM", entry_fee: "₹80", location: "Indira Nagar, Mysore" },
    { name: "GRS Fantasy Park", category: "Attractions", description: "Water park and amusement park.", timings: "11:00 AM - 6:00 PM", entry_fee: "₹500", location: "Mysore-Bangalore Road" },
    { name: "Sand Sculpture Museum", category: "Attractions", description: "Amazing sculptures made from sand.", timings: "9:00 AM - 7:00 PM", entry_fee: "₹40", location: "Chamundi Hill Road, Mysore" },
    { name: "Melody World Wax Museum", category: "Attractions", description: "Wax figures of celebrities.", timings: "9:30 AM - 6:30 PM", entry_fee: "₹100", location: "Chamundi Hill Road, Mysore" },
    { name: "Planet Earth Aquarium", category: "Attractions", description: "Aquarium with diverse marine life.", timings: "10:00 AM - 8:00 PM", entry_fee: "₹50", location: "Nazarbad, Mysore" },
    { name: "Mall of Mysore", category: "Attractions", description: "Shopping mall with entertainment.", timings: "10:00 AM - 10:00 PM", entry_fee: "Free", location: "KRS Road, Mysore" },
    
    // Religious (6)
    { name: "Chamundeshwari Temple", category: "Religious", description: "Famous hilltop temple of Goddess Chamundeshwari.", timings: "7:30 AM - 2:00 PM, 3:30 PM - 6:00 PM", entry_fee: "Free", location: "Chamundi Hills, Mysore" },
    { name: "Nandi Statue", category: "Religious", description: "Giant monolithic Nandi bull statue.", timings: "Sunrise to Sunset", entry_fee: "Free", location: "Chamundi Hills, Mysore" },
    { name: "ISKCON Mysore", category: "Religious", description: "Beautiful temple with modern architecture.", timings: "7:15 AM - 1:00 PM, 4:00 PM - 8:15 PM", entry_fee: "Free", location: "Jayanagar, Mysore" },
    { name: "Lakshmiramana Temple", category: "Religious", description: "Ancient temple dedicated to Lord Vishnu.", timings: "6:00 AM - 12:00 PM, 5:00 PM - 8:00 PM", entry_fee: "Free", location: "Inside Mysore Palace" },
    { name: "Shweta Varahaswamy Temple", category: "Religious", description: "Historic temple near palace.", timings: "6:00 AM - 12:00 PM, 5:00 PM - 8:00 PM", entry_fee: "Free", location: "Near Mysore Palace" },
    { name: "Sri Ranganathaswamy Temple", category: "Religious", description: "Famous temple in Srirangapatna.", timings: "6:00 AM - 1:00 PM, 4:00 PM - 8:00 PM", entry_fee: "Free", location: "Srirangapatna" },
    
    // Nearby Places (10)
    { name: "Srirangapatna", category: "Nearby", description: "Island town with historical significance.", timings: "9:00 AM - 5:30 PM", entry_fee: "Various", location: "Srirangapatna, Karnataka" },
    { name: "Ranganathittu Bird Sanctuary", category: "Nearby", description: "Famous bird sanctuary on Kaveri river.", timings: "9:00 AM - 5:30 PM", entry_fee: "₹50", location: "Srirangapatna Taluk" },
    { name: "Talakadu", category: "Nearby", description: "Sand dunes and ancient temples.", timings: "8:00 AM - 6:00 PM", entry_fee: "Free", location: "Talakadu, Karnataka" },
    { name: "Shivanasamudra Falls", category: "Nearby", description: "Scenic waterfall on Kaveri river.", timings: "8:00 AM - 5:00 PM", entry_fee: "Free", location: "Shivanasamudra, Karnataka" },
    { name: "Coorg", category: "Nearby", description: "Beautiful hill station known for coffee plantations.", timings: "24 hours", entry_fee: "Free", location: "Coorg, Karnataka" },
    { name: "Bandipur National Park", category: "Nearby", description: "Wildlife sanctuary with tigers and elephants.", timings: "6:00 AM - 9:00 AM, 3:00 PM - 6:00 PM", entry_fee: "₹200", location: "Bandipur, Karnataka" },
    { name: "Nagarhole National Park", category: "Nearby", description: "Rich wildlife sanctuary.", timings: "6:00 AM - 9:00 AM, 3:00 PM - 6:00 PM", entry_fee: "₹200", location: "Nagarhole, Karnataka" },
    { name: "BR Hills", category: "Nearby", description: "Hill station with wildlife sanctuary.", timings: "6:00 AM - 6:00 PM", entry_fee: "₹150", location: "BR Hills, Karnataka" },
    { name: "Himavad Gopalaswamy Betta", category: "Nearby", description: "Hilltop temple with misty views.", timings: "7:00 AM - 5:00 PM", entry_fee: "Free", location: "BR Hills, Karnataka" },
    { name: "Kabini", category: "Nearby", description: "River resort and wildlife spot.", timings: "24 hours", entry_fee: "Varies", location: "Kabini, Karnataka" }
];

// 15 HOTELS (Master List)
const hotelsList = [
    "Radisson Blu Plaza Hotel", "Royal Orchid Metropole", "Hotel Pai Vista",
    "Southern Star Mysore", "Sandesh The Prince", "Silent Shores Resort",
    "The Windflower Resort", "Hotel Roopa", "Hotel MB International",
    "Fortune JP Palace", "KSTDC Mayura Hotel", "Hotel Siddharta",
    "The Quorum Hotel", "Hotel Maurya Residency", "Hotel Dasaprakash"
];

// 15 RESTAURANTS (Master List)
const restaurantsList = [
    "Mylari Hotel", "Vinayaka Mylari", "RRR Restaurant", "Oyster Bay",
    "The Old House", "Depth N Green", "Indra Cafe", "Domino's Pizza",
    "Cafe Aramane", "Mahesh Prasad", "Spring Restaurant",
    "Green Heritage Restaurant", "Highway 18", "Cafe Coffee Day", "KSTDC Restaurant"
];

// PLACE → HOTELS MAPPING
const placeHotelsMapping = {
    "Mysore Palace": ["Radisson Blu Plaza Hotel", "Royal Orchid Metropole", "Hotel Pai Vista", "Southern Star Mysore"],
    "Chamundeshwari Temple": ["Hotel Pai Vista", "Southern Star Mysore", "Hotel Roopa"],
    "Brindavan Gardens": ["Silent Shores Resort", "The Windflower Resort", "KSTDC Mayura Hotel"],
    "Mysore Zoo": ["Sandesh The Prince", "Hotel Siddharta", "Hotel Pai Vista"],
    "St Philomena Church": ["Fortune JP Palace", "Hotel MB International"],
    "Jaganmohan Palace": ["Hotel Dasaprakash", "Hotel Maurya Residency"],
    "Lalitha Mahal Palace": ["Radisson Blu Plaza Hotel", "Royal Orchid Metropole"],
    "Karanji Lake": ["The Windflower Resort", "Silent Shores Resort"],
    "Kukkarahalli Lake": ["Hotel Pai Vista", "Hotel Roopa"],
    "Lingambudhi Lake": ["Silent Shores Resort", "The Quorum Hotel"],
    "Srirangapatna": ["KSTDC Mayura Hotel", "Hotel Roopa"],
    "Ranganathittu Bird Sanctuary": ["KSTDC Mayura Hotel", "Silent Shores Resort"],
    "Coorg": ["Radisson Blu Plaza Hotel", "Southern Star Mysore"],
    "Bandipur National Park": ["The Windflower Resort", "Sandesh The Prince"],
    "Nagarhole National Park": ["Silent Shores Resort", "The Windflower Resort"]
};

// PLACE → RESTAURANTS MAPPING
const placeRestaurantsMapping = {
    "Mysore Palace": ["Mylari Hotel", "RRR Restaurant", "Oyster Bay", "Mahesh Prasad"],
    "Chamundeshwari Temple": ["Mylari Hotel", "Mahesh Prasad", "Indra Cafe"],
    "Brindavan Gardens": ["KSTDC Restaurant", "RRR Restaurant", "Indra Cafe"],
    "Mysore Zoo": ["Oyster Bay", "Domino's Pizza", "Cafe Aramane"],
    "St Philomena Church": ["The Old House", "Depth N Green"],
    "Jaganmohan Palace": ["Indra Cafe", "RRR Restaurant"],
    "Lalitha Mahal Palace": ["Spring Restaurant", "RRR Restaurant"],
    "Karanji Lake": ["Green Heritage Restaurant", "Cafe Coffee Day"],
    "Kukkarahalli Lake": ["Cafe Coffee Day", "Highway 18"],
    "Lingambudhi Lake": ["Green Heritage Restaurant", "Cafe Coffee Day"],
    "Srirangapatna": ["KSTDC Restaurant", "RRR Restaurant"],
    "Ranganathittu Bird Sanctuary": ["KSTDC Restaurant", "Green Heritage Restaurant"],
    "Coorg": ["The Old House", "Spring Restaurant"],
    "Bandipur National Park": ["Highway 18", "KSTDC Restaurant"],
    "Nagarhole National Park": ["Highway 18", "Green Heritage Restaurant"]
};

// ITINERARY PLANS (Smart Feature)
const itineraryPlans = [
    { place_name: "Mysore Palace", morning: "Mysore Palace - Explore the magnificent palace", afternoon: "Jaganmohan Palace & Karanji Lake", evening: "Brindavan Gardens for musical fountain" },
    { place_name: "Chamundeshwari Temple", morning: "Climb Chamundi Hills & visit temple", afternoon: "Mysore Palace & Devaraja Market", evening: "Kukkarahalli Lake sunset walk" },
    { place_name: "Brindavan Gardens", morning: "KRS Dam visit", afternoon: "Brindavan Gardens", evening: "Musical Fountain Show (7 PM)" },
    { place_name: "Mysore Zoo", morning: "Mysore Zoo", afternoon: "Railway Museum", evening: "Karanji Lake boating" },
    { place_name: "Srirangapatna", morning: "Srirangapatna Fort & Temples", afternoon: "Ranganathittu Bird Sanctuary", evening: "Cauvery River view" },
    { place_name: "Coorg", morning: "Abbey Falls & Coffee Plantation", afternoon: "Raja's Seat", evening: "Dubare Elephant Camp" },
    { place_name: "Bandipur National Park", morning: "Morning Safari (6 AM)", afternoon: "Forest walk", evening: "Evening Safari" }
];

// Price ranges and ratings for hotels
const hotelPriceRanges = {
    "Radisson Blu Plaza Hotel": { price: "₹5000-10000", rating: 4.5 },
    "Royal Orchid Metropole": { price: "₹4000-8000", rating: 4.3 },
    "Hotel Pai Vista": { price: "₹2000-4000", rating: 4.0 },
    "Southern Star Mysore": { price: "₹3000-6000", rating: 4.2 },
    "Sandesh The Prince": { price: "₹2500-5000", rating: 4.1 },
    "Silent Shores Resort": { price: "₹6000-12000", rating: 4.4 },
    "The Windflower Resort": { price: "₹7000-12000", rating: 4.3 },
    "Hotel Roopa": { price: "₹1500-3000", rating: 3.8 },
    "Hotel MB International": { price: "₹2000-4000", rating: 4.0 },
    "Fortune JP Palace": { price: "₹3500-7000", rating: 4.3 },
    "KSTDC Mayura Hotel": { price: "₹1500-2500", rating: 3.9 },
    "Hotel Siddharta": { price: "₹1800-3500", rating: 3.9 },
    "The Quorum Hotel": { price: "₹3500-6500", rating: 4.2 },
    "Hotel Maurya Residency": { price: "₹1500-3000", rating: 3.8 },
    "Hotel Dasaprakash": { price: "₹1800-3500", rating: 3.9 }
};

// Cuisines and ratings for restaurants
const restaurantDetails = {
    "Mylari Hotel": { cuisine: "South Indian", rating: 4.5 },
    "Vinayaka Mylari": { cuisine: "South Indian", rating: 4.4 },
    "RRR Restaurant": { cuisine: "North/South Indian", rating: 4.3 },
    "Oyster Bay": { cuisine: "Multi-cuisine", rating: 4.2 },
    "The Old House": { cuisine: "Italian/Cafe", rating: 4.5 },
    "Depth N Green": { cuisine: "Multi-cuisine", rating: 4.3 },
    "Indra Cafe": { cuisine: "South Indian", rating: 4.1 },
    "Domino's Pizza": { cuisine: "Fast Food", rating: 4.0 },
    "Cafe Aramane": { cuisine: "Cafe", rating: 4.1 },
    "Mahesh Prasad": { cuisine: "Vegetarian", rating: 4.2 },
    "Spring Restaurant": { cuisine: "Multi-cuisine", rating: 4.4 },
    "Green Heritage Restaurant": { cuisine: "South Indian", rating: 4.0 },
    "Highway 18": { cuisine: "Multi-cuisine", rating: 4.2 },
    "Cafe Coffee Day": { cuisine: "Cafe", rating: 4.0 },
    "KSTDC Restaurant": { cuisine: "Karnataka Meals", rating: 3.9 }
};

// ==================== DATABASE INITIALIZATION ====================

// Read schema file
const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Execute schema
db.exec(schema, (err) => {
    if (err) {
        console.error('Error creating tables:', err.message);
        process.exit(1);
    }
    console.log('✅ Database tables created successfully');
    
    // Check if data already exists
    db.get("SELECT COUNT(*) as count FROM places", (err, result) => {
        if (err) {
            console.error('Error checking data:', err.message);
            return;
        }
        
        if (result.count > 0) {
            console.log(`✅ Database already has ${result.count} places. Skipping insert.`);
            displaySummary();
        } else {
            console.log('📝 Inserting 40 places, 15 hotels, 15 restaurants...');
            insertAllData();
        }
    });
});

function insertAllData() {
    // Insert Places
    const placeStmt = db.prepare(`
        INSERT INTO places (name, category, description, timings, entry_fee, location) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const placeIds = {};
    
    places.forEach(place => {
        placeStmt.run([place.name, place.category, place.description, place.timings, place.entry_fee, place.location], 
            function(err) {
                if (err) console.error('Error inserting place:', err.message);
                else placeIds[place.name] = this.lastID;
            }
        );
    });
    placeStmt.finalize();
    
    // Wait a bit for places to be inserted
    setTimeout(() => {
        // Insert Hotels based on mapping
        const hotelStmt = db.prepare(`INSERT INTO hotels (name, place_id, price_range, rating) VALUES (?, ?, ?, ?)`);
        
        for (const [placeName, hotelNames] of Object.entries(placeHotelsMapping)) {
            const placeId = placeIds[placeName];
            if (placeId) {
                hotelNames.forEach(hotelName => {
                    const details = hotelPriceRanges[hotelName] || { price: "₹2000-4000", rating: 4.0 };
                    hotelStmt.run([hotelName, placeId, details.price, details.rating]);
                });
            }
        }
        hotelStmt.finalize();
        
        // Insert Restaurants based on mapping
        const restaurantStmt = db.prepare(`INSERT INTO restaurants (name, place_id, cuisine, rating) VALUES (?, ?, ?, ?)`);
        
        for (const [placeName, restaurantNames] of Object.entries(placeRestaurantsMapping)) {
            const placeId = placeIds[placeName];
            if (placeId) {
                restaurantNames.forEach(restName => {
                    const details = restaurantDetails[restName] || { cuisine: "Multi-cuisine", rating: 4.0 };
                    restaurantStmt.run([restName, placeId, details.cuisine, details.rating]);
                });
            }
        }
        restaurantStmt.finalize();
        
        // Insert Itinerary Plans
        const itineraryStmt = db.prepare(`INSERT INTO itinerary_plans (place_name, morning, afternoon, evening) VALUES (?, ?, ?, ?)`);
        
        itineraryPlans.forEach(plan => {
            itineraryStmt.run([plan.place_name, plan.morning, plan.afternoon, plan.evening]);
        });
        itineraryStmt.finalize();
        
        console.log('✅ All data inserted successfully!');
        displaySummary();
    }, 500);
}

function displaySummary() {
    console.log('\n📊 Database Summary:');
    db.get("SELECT COUNT(*) as count FROM places", (err, result) => {
        console.log(`   📍 Places: ${result.count}`);
    });
    db.get("SELECT COUNT(*) as count FROM hotels", (err, result) => {
        console.log(`   🏨 Hotels: ${result.count}`);
    });
    db.get("SELECT COUNT(*) as count FROM restaurants", (err, result) => {
        console.log(`   🍴 Restaurants: ${result.count}`);
    });
    db.get("SELECT COUNT(*) as count FROM itinerary_plans", (err, result) => {
        console.log(`   📅 Itinerary Plans: ${result.count}`);
    });
    console.log('\n✅ Database initialization complete!');
    console.log('🚀 You can now start the backend server with: npm start\n');
}