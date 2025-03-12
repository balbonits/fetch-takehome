const FavoritesPage = () => {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">My Favorite Dogs</h2>
            <a 
              href="/search" 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Back to Search
            </a>
          </div>
          
          {/* No favorites message */}
          {false && (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">You don't have any favorite dogs yet.</p>
              <a 
                href="/search" 
                className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Find Dogs
              </a>
            </div>
          )}
          
          {/* Favorites grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(num => (
              <div key={num} className="bg-white rounded-lg shadow-md overflow-hidden border">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Favorite Dog {num}</h3>
                    <button className="text-2xl">❤️</button>
                  </div>
                  <p className="text-gray-600">Breed Type</p>
                  <p className="text-gray-600">Age: {num} years</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-4 border-t">
            <button 
              className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit Adoption Request
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default FavoritesPage;