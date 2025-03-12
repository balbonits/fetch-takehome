const SearchPage = () => {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Find Your Perfect Dog</h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
              <input
                type="text"
                id="breed"
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for dog cards */}
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Dog Name</h3>
                  <button className="text-2xl">🤍</button>
                </div>
                <p className="text-gray-600">Breed</p>
                <p className="text-gray-600">Age</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SearchPage;