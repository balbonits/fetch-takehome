import { useState } from 'react';
import DogCard from './DogCard';

const FavoritesList = ({ onSubmitAdoption }) => {
  // Mock favorite dogs data
  const [favoriteDogs, setFavoriteDogs] = useState([
    {
      id: '1',
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 3,
      img: null
    },
    {
      id: '2',
      name: 'Max',
      breed: 'German Shepherd',
      age: 2,
      img: null
    },
    {
      id: '3',
      name: 'Luna',
      breed: 'Labrador',
      age: 1,
      img: null
    }
  ]);

  const handleToggleFavorite = (dogId) => {
    setFavoriteDogs(favoriteDogs.filter(dog => dog.id !== dogId));
  };

  return (
    <div>
      {favoriteDogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">You don't have any favorite dogs yet.</p>
          <a 
            href="/search" 
            className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Find Dogs
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {favoriteDogs.map(dog => (
              <DogCard 
                key={dog.id} 
                dog={dog} 
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
          
          <div className="flex justify-center pt-4 border-t">
            <button 
              onClick={onSubmitAdoption}
              className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Adoption Request
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesList;