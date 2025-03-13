// context/DogsContext.js
'use client';

import { createContext, useState, useContext, useCallback } from 'react';

const DogsContext = createContext(null);

export const DogsProvider = ({ children }) => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false); // Start false, only true during fetch
  const [error, setError] = useState('');

  const fetchBreeds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch breeds');
      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, stable function

  const fetchDogs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to search dogs');
      const { resultIds } = await response.json();
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
  }, []); // No dependencies, stable function

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