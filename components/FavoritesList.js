// components/FavoritesList.js
'use client';

import { useDogs } from '../context/DogsContext';
import DogCard from './DogCard';

const FavoritesList = () => {
  const { favorites, dogs } = useDogs();
  const favoriteDogs = dogs.filter((dog) => favorites.includes(dog.id));

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {favoriteDogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;