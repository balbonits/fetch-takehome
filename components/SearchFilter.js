import { useState } from 'react';

const SearchFilters = ({ onSearch }) => {
  const [breed, setBreed] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ breed, ageMin: Number(ageMin) || 0, ageMax: Number(ageMax) || null });
  };
  
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
        <input
          type="text"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Any breed"
        />
      </div>
      
      <div>
        <label htmlFor="ageMin" className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
        <input
          type="number"
          id="ageMin"
          min="0"
          value={ageMin}
          onChange={(e) => setAgeMin(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="0"
        />
      </div>
      
      <div>
        <label htmlFor="ageMax" className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
        <input
          type="number"
          id="ageMax"
          min="0"
          value={ageMax}
          onChange={(e) => setAgeMax(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="20"
        />
      </div>
      
      <div className="md:col-span-3 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFilters;