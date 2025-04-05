import React from 'react';
import { Plane } from 'lucide-react';

const Footer: React.FC = () => {
  return (
      <footer className="py-8 border-t border-white/10 bg-black/25 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Plane className="text-[--primary-red]" />
              <span className="font-bold text-white">Skyline Bulls Technology</span>
            </div>
            <div className="text-white/70">
              © {new Date().getFullYear()} Skyline Bulls. All rights reserved. | Made with ❤️ by Denis Dobra
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer; 