'use client';

import { AuthProvider } from '../context/AuthContext';
import { DogsProvider } from '../context/DogsContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <DogsProvider>{children}</DogsProvider>
    </AuthProvider>
  );
};