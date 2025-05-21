import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
      <footer className="py-8 border-t border-white/10 bg-black/25 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0"><Logo /></div>
            <div className="text-white/70 text-center">
              © {new Date().getFullYear()} Skyline Bulls. All rights reserved. | Made with ❤️ by Denis Dobra
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer; 