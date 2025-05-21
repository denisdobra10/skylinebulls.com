import React from 'react';

const Logo: React.FC = () => (
  <span className="flex items-center gap-3">
    <img src="/logo.png" alt="Skyline Bulls Logo" className="h-14 w-auto drop-shadow-lg" />
    <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[--primary-red] to-pink-500 bg-clip-text text-transparent tracking-wide drop-shadow-md">
      Skyline Bulls
    </span>
  </span>
);

export default Logo; 