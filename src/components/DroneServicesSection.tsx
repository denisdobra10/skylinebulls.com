import React from 'react';
import { Camera, Map, Building, ChevronRight } from 'lucide-react';

const droneServices = [
  {
    icon: <Camera className="h-8 w-8" />,
    name: "Aerial Photography",
    description: "High-quality aerial photos and videos for real estate and events",
    features: ["4K Video", "Real Estate Tours", "Event Coverage", "Marketing Material"]
  },
  {
    icon: <Map className="h-8 w-8" />,
    name: "Mapping & Surveying",
    description: "Precise aerial mapping and 3D modeling services",
    features: ["Topographic Mapping", "3D Modeling", "Volume Calculations", "Site Planning"]
  },
  {
    icon: <Building className="h-8 w-8" />,
    name: "Infrastructure Inspection",
    description: "Detailed inspection of buildings, bridges, and industrial facilities",
    features: ["Thermal Imaging", "Structural Analysis", "Safety Inspections", "Maintenance Planning"]
  }
];

const DroneServicesSection: React.FC = () => (
  <section id="drone-services" className="section bg-gradient-to-b from-[--primary-red]/10 to-black/20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">Drone Services</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Professional aerial solutions leveraging cutting-edge drone technology
          to provide unique perspectives and valuable insights
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {droneServices.map((service, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[--primary-red]/10 rounded-full blur-3xl group-hover:bg-[--primary-red]/20 transition-all"></div>
            <div className="relative">
              <div className="text-[--primary-red] mb-6 transform group-hover:scale-110 transition-transform inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.name}</h3>
              <p className="text-white/70 mb-6">{service.description}</p>
              <div className="space-y-2 opacity-100 max-h-40">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-white/50">
                    <ChevronRight className="h-4 w-4 mr-2 text-[--primary-red]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DroneServicesSection; 