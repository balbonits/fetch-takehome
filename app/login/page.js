const LoginPage = () => {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Login to Your Account</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;