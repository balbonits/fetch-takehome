'use client';

import { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="p-4 text-center text-red-600">
        Something went wrong. Please try refreshing the page.
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;