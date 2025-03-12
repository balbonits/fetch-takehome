const SearchFilter = ({ breeds, selectedBreeds, setSelectedBreeds, ageMin, setAgeMin, ageMax, setAgeMax, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the filter values, including the breeds array, to onSearch
    onSearch({ breeds: selectedBreeds, ageMin: Number(ageMin) || 0, ageMax: Number(ageMax) || null });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="breeds" className="block text-sm font-medium text-gray-700 mb-1">Breeds</label>
        <select
          id="breeds"
          multiple
          value={selectedBreeds}
          onChange={(e) => setSelectedBreeds(Array.from(e.target.selectedOptions, option => option.value))}
          className="form-select"
        >
          {breeds.map((breedOption) => (
            <option key={breedOption} value={breedOption}>
              {breedOption}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ageMin" className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
        <input
          type="number"
          id="ageMin"
          min="0"
          value={ageMin}
          onChange={(e) => setAgeMin(e.target.value)}
          className="form-input"
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
          className="form-input"
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

export default SearchFilter;