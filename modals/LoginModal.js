// modals/LoginModal.js
'use client';

import LoginForm from '../components/LoginForm';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <LoginForm onSuccess={() => { onLoginSuccess(); onClose(); }} />
      </div>
    </div>
  );
};

export default LoginModal;