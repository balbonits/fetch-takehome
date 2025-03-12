// context/DogsContext.js
'use client';

import { createContext, useState, useContext } from 'react';

const DogsContext = createContext(null);

export const DogsProvider = ({ children }) => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const fetchDogs = async (filters) => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
        { credentials: 'include' }
      );
      const { resultIds } = await response.json();
      const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultIds),
        credentials: 'include',
      });
      const dogsData = await dogsResponse.json();
      setDogs(dogsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DogsContext.Provider value={{ breeds, dogs, loading, error, fetchBreeds, fetchDogs }}>
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);