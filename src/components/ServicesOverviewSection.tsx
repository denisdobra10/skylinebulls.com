import React from 'react';
import { Code, Plane, ChevronRight } from 'lucide-react';

const ServicesOverviewSection: React.FC = () => (
  <section id="services" className="section">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-12">Our Services</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-lg bg-white/5 hover:bg-white/10 transition-all transform hover:-translate-y-1 duration-300">
          <Code className="text-[--primary-red] mb-4 h-12 w-12" />
          <h3 className="text-2xl font-bold mb-4">IT Solutions</h3>
          <p className="text-white/70 mb-6">
            Comprehensive IT services including software development, cloud solutions,
            and cybersecurity to keep your business ahead of the curve.
          </p>
          <a href="#it-services" className="inline-flex items-center text-[--primary-red] hover:text-[--primary-red]/80">
            Learn More <ChevronRight className="ml-1" />
          </a>
        </div>
        <div className="p-8 rounded-lg bg-white/5 hover:bg-white/10 transition-all transform hover:-translate-y-1 duration-300">
          <Plane className="text-[--primary-red] mb-4 h-12 w-12" />
          <h3 className="text-2xl font-bold mb-4">Drone Services</h3>
          <p className="text-white/70 mb-6">
            Professional drone solutions for aerial photography, surveying,
            and inspection services with cutting-edge equipment.
          </p>
          <a href="#drone-services" className="inline-flex items-center text-[--primary-red] hover:text-[--primary-red]/80">
            Learn More <ChevronRight className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesOverviewSection; 