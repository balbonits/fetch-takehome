'use client';

import { useState } from 'react';
import DogCard from '../../components/DogCard';
import SearchFilter from '../../components/SearchFilter';

const SearchPage = () => {
  // Mock data
  const [dogs, setDogs] = useState([
    { id: '1', name: 'Buddy', breed: 'Golden Retriever', age: 3, img: null },
    { id: '2', name: 'Max', breed: 'German Shepherd', age: 2, img: null },
    { id: '3', name: 'Luna', breed: 'Labrador', age: 1, img: null },
    { id: '4', name: 'Charlie', breed: 'Beagle', age: 4, img: null },
    { id: '5', name: 'Bailey', breed: 'French Bulldog', age: 2, img: null },
    { id: '6', name: 'Cooper', breed: 'Siberian Husky', age: 3, img: null }
  ]);
  
  const [favorites, setFavorites] = useState(['2', '5']);
  
  const handleToggleFavorite = (dogId) => {
    setFavorites(prev => 
      prev.includes(dogId) 
        ? prev.filter(id => id !== dogId) 
        : [...prev, dogId]
    );
  };
  
  const handleSearch = (filters) => {
    console.log('Search filters:', filters);
    // Would call API here in real implementation
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="mb-4">Find Your Perfect Dog</h2>
        <SearchFilter onSearch={handleSearch} />
        
        <hr className="my-6 border-gray-200" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map(dog => (
            <DogCard 
              key={dog.id} 
              dog={dog} 
              isFavorite={favorites.includes(dog.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;