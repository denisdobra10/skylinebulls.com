import React from 'react';
import CodeBlock from './CodeBlock';
import { ChevronRight } from 'lucide-react';

const codeExample = `<div class="flex min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-white mb-8">
      Welcome to Skyline Bulls
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h2 class="text-2xl text-white mb-4">Enterprise Solutions</h2>
        <p class="text-gray-300">Building the future of technology.</p>
      </div>
    </div>
  </div>
</div>`;

const itServices = [
  {
    icon: <span className="text-[--primary-red]">🌐</span>,
    name: "Web Development",
    description: "Custom web applications and responsive websites built with modern frameworks",
    features: ["React & Next.js", "Vue & Nuxt.js", "API Development", "UI/UX Design"]
  },
  {
    icon: <span className="text-[--primary-red]">🖥️</span>,
    name: "Software Development",
    description: "Custom software solutions for your business needs",
    features: ["Enterprise Software", "Mobile Apps", "Desktop Applications", "System Integration"]
  },
  {
    icon: <span className="text-[--primary-red]">🗄️</span>,
    name: "Infrastructure",
    description: "Robust and scalable infrastructure solutions",
    features: ["Server Management", "Load Balancing", "Monitoring", "Disaster Recovery"]
  },
  {
    icon: <span className="text-[--primary-red]">🔗</span>,
    name: "Network Solutions",
    description: "Comprehensive networking and connectivity solutions",
    features: ["Network Design", "VPN Setup", "WiFi Solutions", "Network Security"]
  },
  {
    icon: <span className="text-[--primary-red]">💾</span>,
    name: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services",
    features: ["Cloud Migration", "DevOps", "Serverless Architecture", "Performance Optimization"]
  },
  {
    icon: <span className="text-[--primary-red]">🛡️</span>,
    name: "Cybersecurity",
    description: "Advanced security solutions to protect your digital assets",
    features: ["Penetration Testing", "Security Audits", "Incident Response", "Security Training"]
  },
];

const ITServicesSection: React.FC = () => (
  <section id="it-services" className="section">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
        <div className="flex-1 w-full">
          <h2 className="text-4xl font-bold mb-6">IT Services</h2>
          <p className="text-xl text-white/70 mb-8">
            Enterprise-grade solutions built with cutting-edge technology to drive your business forward
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm transition-all duration-300 hover:scale-110 hover:bg-[--primary-red]/20 hover:text-white hover:shadow-lg hover:shadow-[--primary-red]/20 cursor-pointer transform-gpu">Web Development</span>
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm transition-all duration-300 hover:scale-110 hover:bg-[--primary-red]/20 hover:text-white hover:shadow-lg hover:shadow-[--primary-red]/20 cursor-pointer transform-gpu">Software Development</span>
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm transition-all duration-300 hover:scale-110 hover:bg-[--primary-red]/20 hover:text-white hover:shadow-lg hover:shadow-[--primary-red]/20 cursor-pointer transform-gpu">Content Management</span>
            <span className="px-4 py-2 rounded-full bg-white/10 text-sm transition-all duration-300 hover:scale-110 hover:bg-[--primary-red]/20 hover:text-white hover:shadow-lg hover:shadow-[--primary-red]/20 cursor-pointer transform-gpu">DevOps</span>
          </div>
        </div>
        <div className="flex-1 w-full overflow-hidden">
          <CodeBlock code={codeExample} language="html" fileName="example.html" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itServices.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="mb-4 text-3xl">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="text-white/70 mb-4">{service.description}</p>
            <div className="grid grid-cols-2 gap-2 opacity-100 max-h-40">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-white/50">
                  <ChevronRight className="h-4 w-4 mr-1 text-[--primary-red]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ITServicesSection; 