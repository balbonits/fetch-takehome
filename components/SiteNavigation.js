'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const SiteNavigation = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-blue-500 text-white">
      <div className="container mx-auto py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Link href="/search" className="font-medium hover:text-blue-100">
                Search
              </Link>
              <Link href="/favorites" className="font-medium hover:text-blue-100">
                My Favorites
              </Link>
            </>
          )}
        </div>
        
        {user ? (
          <div className="flex items-center space-x-2">
            <span>Welcome, {user.name}</span>
            <button 
              className="px-2 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="font-medium hover:text-blue-100">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default SiteNavigation;