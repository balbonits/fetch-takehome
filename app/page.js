const Home = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Welcome to Dog Adoption</h2>
        <p className="mb-6 text-gray-600 text-center">
          Please login to find your perfect canine companion.
        </p>
        <div className="flex justify-center">
          <a 
            href="/login" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};
export default Home;