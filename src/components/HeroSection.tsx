import React from 'react';
import InteractiveCircles from './InteractiveCircles';
import { ChevronRight } from 'lucide-react';

const HeroSection: React.FC = () => (
  <section className="section pt-32 min-h-screen flex items-center relative overflow-hidden">
    <InteractiveCircles />
    <div className="container mx-auto px-4 relative z-10">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Elevate Your Business with
        <span className="gradient-text block">Advanced Technology</span>
      </h1>
      <p className="text-xl text-white/70 max-w-2xl mb-8">
        Skyline Bulls Technology delivers cutting-edge IT solutions and innovative drone services
        to transform your business operations.
      </p>
      <div className="flex flex-wrap gap-4">
        <a href="#contact" className="btn-primary">Get Started <ChevronRight className="inline" /></a>
        <a href="#services" className="btn-outline">Our Services</a>
      </div>
    </div>
  </section>
);

export default HeroSection; 