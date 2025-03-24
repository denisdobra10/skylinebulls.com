import React, { useState } from 'react';
import { Plane, Code, Send, ChevronRight, Menu, X, Globe, Shield, Database, Camera, Map, Building, Server, Cpu, Network, Bot, Brain, Sparkles, Zap, Workflow, GitBranch } from 'lucide-react';
import { z } from 'zod';
import StarryBackground from './components/StarryBackground';
import CodeBlock from './components/CodeBlock';
import SuccessPopup from './components/SuccessPopup';
import './styles/prism-custom.css';

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+\-\s]*$/, 'Please enter a valid phone number').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormType = z.infer<typeof contactFormSchema>;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [activeService, setActiveService] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [contactForm, setContactForm] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(contactForm);
      setIsSubmitting(true);

      const response = await fetch('https://hook.us2.make.com/23bf118nwm3ahp7g2h91nihefk9ybpww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setFormErrors(errors);
      } else {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
      icon: <Globe className="h-8 w-8" />,
      name: "Web Development",
      description: "Custom web applications and responsive websites built with modern frameworks",
      features: ["React & Next.js", "Progressive Web Apps", "API Development", "UI/UX Design"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      name: "Cybersecurity",
      description: "Advanced security solutions to protect your digital assets",
      features: ["Penetration Testing", "Security Audits", "Incident Response", "Security Training"]
    },
    {
      icon: <Database className="h-8 w-8" />,
      name: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services",
      features: ["Cloud Migration", "DevOps", "Serverless Architecture", "Performance Optimization"]
    },
    {
      icon: <Server className="h-8 w-8" />,
      name: "Infrastructure",
      description: "Robust and scalable infrastructure solutions",
      features: ["Server Management", "Load Balancing", "Monitoring", "Disaster Recovery"]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      name: "Software Development",
      description: "Custom software solutions for your business needs",
      features: ["Enterprise Software", "Mobile Apps", "Desktop Applications", "System Integration"]
    },
    {
      icon: <Network className="h-8 w-8" />,
      name: "Network Solutions",
      description: "Comprehensive networking and connectivity solutions",
      features: ["Network Design", "VPN Setup", "WiFi Solutions", "Network Security"]
    }
  ];

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

  const aiServices = [
    {
      icon: <Bot className="h-8 w-8" />,
      name: "AI-Powered Agents",
      description: "Custom AI agents that automate complex tasks and workflows",
      integrations: ["OpenAI", "Anthropic", "Google AI", "HuggingFace"],
      features: ["Natural Language Processing", "Task Automation", "24/7 Operation", "Adaptive Learning"]
    },
    {
      icon: <Brain className="h-8 w-8" />,
      name: "Machine Learning Solutions",
      description: "Advanced ML models for predictive analytics and decision making",
      integrations: ["TensorFlow", "PyTorch", "Scikit-learn", "AWS SageMaker"],
      features: ["Predictive Analytics", "Pattern Recognition", "Data Mining", "Model Training"]
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      name: "Workflow Automation",
      description: "End-to-end automation solutions for business processes",
      integrations: ["Zapier", "Make", "Power Automate", "n8n"],
      features: ["Process Automation", "Custom Workflows", "Integration Hub", "Error Handling"]
    },
    {
      icon: <GitBranch className="h-8 w-8" />,
      name: "LLM Integration",
      description: "Seamless integration of Large Language Models into your systems",
      integrations: ["GPT-4", "Claude", "PaLM", "Llama"],
      features: ["API Integration", "Custom Training", "Prompt Engineering", "Response Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <StarryBackground />
      {showSuccess && (
        <SuccessPopup
          message="Thank you for reaching out! We'll get back to you soon."
          onClose={() => setShowSuccess(false)}
        />
      )}
      {/* Navigation */}
      <nav className="fixed w-full bg-black/25 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold text-white flex items-center gap-2">
              <Plane className="text-[--primary-red]" />
              Skyline Bulls
            </a>

            <button className="lg:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
              <a href="#newsletter" className="btn-primary">Newsletter</a>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <a href="#services" className="block nav-link py-3">Services</a>
              <a href="#about" className="block nav-link py-3">About</a>
              <a href="#contact" className="block nav-link py-3">Contact</a>
              <a href="#newsletter" className="btn-primary block text-center mt-4">Newsletter</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section pt-32 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
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

      {/* Services Overview Section */}
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

      {/* IT Services Section */}
      <section id="it-services" className="section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
            <div className="flex-1 w-full">
              <h2 className="text-4xl font-bold mb-6">IT Services</h2>
              <p className="text-xl text-white/70 mb-8">
                Enterprise-grade solutions built with cutting-edge technology to drive your business forward
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Cloud Computing</span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Cybersecurity</span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Web Development</span>
                <span className="px-4 py-2 rounded-full bg-white/10 text-sm">DevOps</span>
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
                className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group h-[280px] hover:h-auto"
                onMouseEnter={() => setActiveService(service.name)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="text-[--primary-red] mb-4 transform group-hover:scale-110 transition-transform inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-white/70 mb-4">{service.description}</p>
                <div className={`grid grid-cols-2 gap-2 transition-all duration-300 ${activeService === service.name ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
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

      {/* AI & Automation Section */}
      <section id="ai-services" className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[--primary-red]/5 to-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AI & Automation
              <span className="block text-[--primary-red] mt-2">All in One Place</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore AI and automation solutions from industry leaders to create powerful,
              reliable systems that transform your business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {aiServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[--primary-red]/50 flex flex-col"
              >
                <div>
                  <div className="text-[--primary-red] mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-white/70 mb-6 text-sm">{service.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-[--primary-red] mb-2">Integrations</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.integrations.map((integration, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[--primary-red] mb-2">Features</h4>
                      <div className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-white/70">
                            <Sparkles className="h-3 w-3 mr-2 text-[--primary-red]" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <button className="w-full py-2 px-4 rounded-lg bg-[--primary-red]/10 hover:bg-[--primary-red]/20 text-[--primary-red] transition-all duration-300 flex items-center justify-center gap-2">
                    Learn More <Zap className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a href="#contact" className="btn-primary flex items-center gap-2">
              Get Started with AI <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Drone Services Section */}
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
                className="group relative p-8 rounded-lg bg-white/5 hover:bg-white/10 transition-all overflow-hidden h-[280px] hover:h-auto"
                onMouseEnter={() => setActiveService(service.name)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[--primary-red]/10 rounded-full blur-3xl group-hover:bg-[--primary-red]/20 transition-all"></div>
                <div className="relative">
                  <div className="text-[--primary-red] mb-6 transform group-hover:scale-110 transition-transform inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.name}</h3>
                  <p className="text-white/70 mb-6">{service.description}</p>
                  <div className={`space-y-2 transition-all duration-300 ${activeService === service.name ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
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

      {/* Newsletter Section */}
      <section id="newsletter" className="section bg-[--primary-red]/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-white/70 mb-8 max-w-2xl">
            Subscribe to our newsletter for the latest updates in technology and drone innovations.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-white/70 mb-6">
                Ready to elevate your business? Reach out to us for a consultation.
              </p>
              <div className="flex items-center gap-2 text-white/70 mb-4">
                <Send className="h-5 w-5" />
                contact@skylinebulls.tech
              </div>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.name ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40`}
                  required
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.email ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40`}
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Your Phone (optional)"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.phone ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40`}
                    pattern="[0-9+\-\s]*"
                    title="Please enter a valid phone number"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30">Optional</span>
                </div>
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.message ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40`}
                  required
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="btn-primary relative" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Plane className="text-[--primary-red]" />
              <span className="font-bold">Skyline Bulls Technology</span>
            </div>
            <div className="text-white/50">
              © {new Date().getFullYear()} Skyline Bulls. All rights reserved. | Deployed with ❤️ on Vercel
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;