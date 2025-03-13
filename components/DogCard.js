// components/DogCard.js
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useDogs } from '../context/DogsContext';

const DogCard = ({ dog }) => {
  const { favorites, toggleFavorite } = useDogs();
  const isFavorited = favorites.includes(dog.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200">
        {dog.img && (
          <img
            src={dog.img}
            alt={dog.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="card-name">{dog.name}</h3>
          <button
            onClick={() => toggleFavorite(dog.id)}
            className="text-red-500 focus:outline-none"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? (
              <HeartSolid className="w-6 h-6" />
            ) : (
              <HeartOutline className="w-6 h-6" />
            )}
          </button>
        </div>
        <p className="text-gray-600">{dog.breed}</p>
        <p className="text-gray-600">
          Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}
        </p>
      </div>
    </div>
  );
};

export default DogCard;