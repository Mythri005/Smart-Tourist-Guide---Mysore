import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlaceDetails from './pages/PlaceDetails';
import Favorites from './pages/Favorites';
import Planner from './pages/Planner';
import AllPlaces from './pages/AllPlaces';  // NEW IMPORT

const styles = {
    app: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
    }
};

function App() {
    const [favorites, setFavorites] = useState([]);
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/favorites');
            const data = await response.json();
            setFavorites(data);
            setFavoriteCount(data.length);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const addToFavorites = async (placeId) => {
        try {
            const response = await fetch('http://localhost:5000/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ place_id: placeId })
            });
            if (response.ok) {
                fetchFavorites();
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/favorites/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchFavorites();
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <Router>
            <div style={styles.app}>
                <Navbar favoriteCount={favoriteCount} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/place/:id" element={<PlaceDetails addToFavorites={addToFavorites} />} />
                    <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
                    <Route path="/planner" element={<Planner />} />
                    <Route path="/places" element={<AllPlaces />} />  {/* NEW ROUTE */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;