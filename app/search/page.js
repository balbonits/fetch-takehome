'use client';

import { useState, useEffect } from 'react';
import DogCard from '../../components/DogCard';
import SearchFilter from '../../components/SearchFilter';
import LoginModal from '../../modals/LoginModal';

const SearchPage = () => {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [filters, setFilters] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const authenticated = authStatus === 'true';
    setIsAuthenticated(authenticated);
    setShowLoginModal(!authenticated);
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favoritedDogIds');
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoritedDogIds', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch breeds
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          credentials: 'include',
        });
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error('Failed to fetch breeds:', error);
      }
    };
    fetchBreeds();
  }, [isAuthenticated]);

  // Fetch dogs based on filters, page, and sort order
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchDogs = async () => {
      setLoading(true);
      setError('');
      try {
        const queryParams = new URLSearchParams({
          size: 10,
          from: page * 10,
          sort: `breed:${sortOrder}`,
        });
        if (filters.breeds && filters.breeds.length > 0) {
          filters.breeds.forEach((breed) => queryParams.append('breeds', breed));
        }
        if (filters.ageMin != null) queryParams.append('ageMin', filters.ageMin);
        if (filters.ageMax != null) queryParams.append('ageMax', filters.ageMax);

        const response = await fetch(
          `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
          { credentials: 'include' }
        );
        if (!response.ok) throw new Error('Failed to fetch search results');
        const { resultIds, total } = await response.json();
        setTotalPages(Math.ceil(total / 10));

        const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resultIds),
          credentials: 'include',
        });
        if (!dogsResponse.ok) throw new Error('Failed to fetch dog details');
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDogs();
  }, [page, sortOrder, filters, isAuthenticated]);

  const handleToggleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
    );
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset to first page on new search
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    localStorage.setItem('isAuthenticated', 'true');
  };

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
          {loading ? (
            <div className="text-center">Loading dogs...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="mb-4">Find Your Perfect Dog</h2>
              <SearchFilter
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
                ageMin={ageMin}
                setAgeMin={setAgeMin}
                ageMax={ageMax}
                setAgeMax={setAgeMax}
                onSearch={handleSearch}
              />
              <hr className="my-6 border-gray-200" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mb-4 form-select"
              >
                <option value="asc">Breed: A-Z</option>
                <option value="desc">Breed: Z-A</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog) => (
                  <DogCard
                    key={dog.id}
                    dog={dog}
                    isFavorite={favorites.includes(dog.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto p-4 text-center py-8">
          <p className="text-xl text-gray-600">Please log in to search for dogs.</p>
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

export default SearchPage;