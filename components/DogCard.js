// components/DogCard.js
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const DogCard = ({ dog, isFavorite = false, onToggleFavorite }) => {
  // Default data if no dog is provided
  const dogData = dog || {
    id: '1',
    name: 'Sample Dog',
    breed: 'Unknown Breed',
    age: 3,
    img: null
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200">
        {dogData.img && (
          <img 
            src={dogData.img} 
            alt={dogData.name} 
            className="w-full h-full object-cover" 
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{dogData.name}</h3>
          <button 
            onClick={() => onToggleFavorite && onToggleFavorite(dogData.id)}
            className="text-red-500 focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartSolid className="w-6 h-6" />
            ) : (
              <HeartOutline className="w-6 h-6" />
            )}
          </button>
        </div>
        <p className="text-gray-600">{dogData.breed}</p>
        <p className="text-gray-600">
          Age: {dogData.age} {dogData.age === 1 ? 'year' : 'years'}
        </p>
      </div>
    </div>
  );
};

export default DogCard;