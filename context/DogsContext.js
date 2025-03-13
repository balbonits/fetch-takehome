// context/DogsContext.js
'use client';

import { createContext, useState, useContext } from 'react';

const DogsContext = createContext(null);

export const DogsProvider = ({ children }) => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        credentials: 'include',
      });
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error('Failed to fetch breeds:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDogs = async (options = {}) => {
    setLoading(true);
    setError('');
    try {
      let resultIds;
      if (options.ids) {
        // Fetch specific dogs by IDs (e.g., favorites)
        resultIds = options.ids;
      } else {
        // Regular search with filters
        const queryParams = new URLSearchParams(options).toString();
        const response = await fetch(
          `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`,
          { credentials: 'include' }
        );
        if (!response.ok) throw new Error('Failed to fetch search results');
        const data = await response.json();
        resultIds = data.resultIds;
      }

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

  const toggleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
    );
  };

  return (
    <DogsContext.Provider value={{ breeds, dogs, favorites, loading, error, fetchBreeds, fetchDogs, toggleFavorite }}>
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);