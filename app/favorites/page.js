'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import FavoritesList from '../../components/FavoritesList';
import LoginModal from '../../modals/LoginModal';

const FavoritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Show login modal if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      setShowLoginModal(true);
    }
  }, [authLoading, user]);

  // Fetch favorite dogs (only for authenticated users)
  useEffect(() => {
    if (!user) return;
    const fetchFavoriteDogs = async () => {
      setLoading(true);
      try {
        const favoritedDogIds = JSON.parse(localStorage.getItem('favoritedDogIds') || '[]');
        if (favoritedDogIds.length > 0) {
          const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favoritedDogIds),
            credentials: 'include',
          });
          const data = await response.json();
          setFavoriteDogs(data);
        } else {
          setFavoriteDogs([]);
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteDogs();
  }, [user]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  if (authLoading) return <div>Loading...</div>;

  return (
    <>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {user ? (
        <div>
          <h1>Your Favorite Dogs</h1>
          {loading ? (
            <p>Loading favorites...</p>
          ) : (
            <FavoritesList favoriteDogs={favoriteDogs} />
          )}
        </div>
      ) : (
        <div>
          <p>Please log in to view your favorites.</p>
          <button onClick={() => setShowLoginModal(true)}>Log In</button>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;