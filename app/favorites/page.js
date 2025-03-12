'use client';

import { useState, useEffect } from 'react';
import FavoritesList from '../../components/FavoritesList';
import LoginModal from '../../modals/LoginModal';

const FavoritesPage = () => {
  const [favoritedDogIds, setFavoritedDogIds] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const authenticated = authStatus === 'true';
    setIsAuthenticated(authenticated);
    setShowLoginModal(!authenticated);
  }, []);

  // Load favorited IDs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favoritedDogIds');
    setFavoritedDogIds(saved ? JSON.parse(saved) : []);
  }, []);

  // Fetch favorited dogs
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchFavoriteDogs = async () => {
      if (favoritedDogIds.length === 0) {
        setFavoriteDogs([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(favoritedDogIds),
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch favorite dogs');
        const data = await response.json();
        setFavoriteDogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteDogs();
  }, [favoritedDogIds, isAuthenticated]);

  // Persist favorited IDs
  useEffect(() => {
    localStorage.setItem('favoritedDogIds', JSON.stringify(favoritedDogIds));
  }, [favoritedDogIds]);

  const handleSubmitAdoption = () => {
    alert('Adoption request submitted!');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  if (loading && isAuthenticated) return <div className="container mx-auto p-4 text-center">Loading favorites...</div>;
  if (error && isAuthenticated) return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;

  return (
    <>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {isAuthenticated ? (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Your Favorite Dogs</h1>
          <FavoritesList
            favoritedDogIds={favoritedDogIds}
            setFavoritedDogIds={setFavoritedDogIds}
            favoriteDogs={favoriteDogs}
            onSubmitAdoption={handleSubmitAdoption}
          />
        </div>
      ) : (
        <div className="container mx-auto p-4 text-center py-8">
          <p className="text-xl text-gray-600">Please log in to view your favorites.</p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;