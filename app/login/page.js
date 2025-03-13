'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    console.log('onSuccess called'); // This is working per your log
    router.push('/search'); // Redirect to /search
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-8">
        <h2 className="mb-6 text-center">Login to Continue</h2>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;