import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  return (
    <div className={`animate-spin rounded-full border-2 border-blue-500 border-t-transparent ${sizes[size]}`} />
  );
};

export default LoadingSpinner;