// modals/LoginModal.js
'use client';

import { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <LoginForm onSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginModal;