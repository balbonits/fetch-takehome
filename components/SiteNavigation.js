// components/SiteNavigation.js
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const SiteNavigation = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          {user ? (<div>
            <div>
              <Link href="/search" className="font-medium hover:text-blue-100">
                 Search
               </Link>
               <Link href="/favorites" className="font-medium hover:text-blue-100">
                 My Favorites
               </Link>              
            </div>
            <div>
              <span className="mr-4">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
            </div>
          ) : (
            <a href="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SiteNavigation;