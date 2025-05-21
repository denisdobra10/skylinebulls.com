import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { z } from 'zod';
import { gsap } from 'gsap';
import StarryBackground from './components/StarryBackground';
import SuccessPopup from './components/SuccessPopup';
import FadeInSection from './components/FadeInSection';
import Footer from './components/Footer';
import './styles/prism-custom.css';
import IntroAnimation from './components/IntroAnimation';
import Logo from './components/Logo';
import HeroSection from './components/HeroSection';
import ServicesOverviewSection from './components/ServicesOverviewSection';
import ITServicesSection from './components/ITServicesSection';
import AISection from './components/AISection';
import DroneServicesSection from './components/DroneServicesSection';
import NewsletterSection from './components/NewsletterSection';
import ContactSection from './components/ContactSection';

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+\-\s]*$/, 'Please enter a valid phone number').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormType = z.infer<typeof contactFormSchema>;

// Add newsletter validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormType = z.infer<typeof newsletterSchema>;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [contactForm, setContactForm] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [cooldownTime, setCooldownTime] = useState(0);
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const [newsletterForm, setNewsletterForm] = useState<NewsletterFormType>({
    email: ''
  });
  const [newsletterErrors, setNewsletterErrors] = useState<{ [key: string]: string }>({});
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [showNewsletterSection, setShowNewsletterSection] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState('');

  // Add cooldown timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  useEffect(() => {
    if (showMainContent && mainContentRef.current) {
      gsap.fromTo(mainContentRef.current,
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 1,
          ease: "power2.inOut"
        }
      );
    }
  }, [showMainContent]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterErrors({});

    try {
      const validatedData = newsletterSchema.parse(newsletterForm);
      setIsNewsletterSubmitting(true);

      const response = await fetch('https://hook.us2.make.com/23bf118nwm3ahp7g2h91nihefk9ybpww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          type: 'newsletter'
        }),
      });

      if (response.ok) {
        setShowNewsletterSuccess(true);
        setNewsletterForm({ email: '' });
        // Hide newsletter section after 2 seconds
        setTimeout(() => {
          setShowNewsletterSection(false);
        }, 2000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setNewsletterErrors(errors);
      } else {
        console.error('Error subscribing:', error);
        alert('Failed to subscribe. Please try again later.');
      }
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewsletterForm({ email: value });
    if (newsletterErrors.email) {
      setNewsletterErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setConsentError('');
    if (!consentChecked) {
      setConsentError('You must accept data processing to submit the form.');
      return;
    }

    try {
      const validatedData = contactFormSchema.parse(contactForm);
      setIsSubmitting(true);

      const response = await fetch('https://hook.us2.make.com/23bf118nwm3ahp7g2h91nihefk9ybpww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validatedData,
          type: 'contact'
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setContactForm({ name: '', email: '', phone: '', message: '' });
        setConsentChecked(false);
        // Start 30 second cooldown
        setCooldownTime(30);
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

  return (
    <div className="min-h-screen bg-transparent">
      <StarryBackground />
      {!showMainContent ? (
        <IntroAnimation onComplete={() => setShowMainContent(true)} />
      ) : (
        <div ref={mainContentRef} style={{ opacity: 0 }}>
          {showSuccess && (
            <SuccessPopup
              message="Thank you for reaching out! We'll get back to you soon."
              onClose={() => setShowSuccess(false)}
            />
          )}
          {showNewsletterSuccess && (
            <SuccessPopup
              message="Thank you for subscribing to our newsletter!"
              onClose={() => setShowNewsletterSuccess(false)}
            />
          )}
          {/* Navigation */}
          <nav className="fixed w-full bg-black/25 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <a href="#" className="block"><Logo /></a>

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
                <div className="lg:hidden mt-4 pb-6 px-6 pt-6 bg-black/80 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col gap-2">
                  <a href="#services" className="block text-lg font-semibold py-3 px-2 rounded-lg hover:bg-white/10 transition-all text-white/90" onClick={() => setIsMenuOpen(false)}>Services</a>
                  <a href="#about" className="block text-lg font-semibold py-3 px-2 rounded-lg hover:bg-white/10 transition-all text-white/90" onClick={() => setIsMenuOpen(false)}>About</a>
                  <a href="#contact" className="block text-lg font-semibold py-3 px-2 rounded-lg hover:bg-white/10 transition-all text-white/90" onClick={() => setIsMenuOpen(false)}>Contact</a>
                  <a href="#newsletter" className="btn-primary block text-center mt-4" onClick={() => setIsMenuOpen(false)}>Newsletter</a>
                </div>
              )}
            </div>
          </nav>

          {/* Hero Section */}
          <FadeInSection duration={1.2} y={30}>
            <HeroSection />
          </FadeInSection>

          {/* Services Overview Section */}
          <FadeInSection delay={0.2} duration={1}>
            <ServicesOverviewSection />
          </FadeInSection>

          {/* IT Services Section */}
          <FadeInSection delay={0.3} duration={1}>
            <ITServicesSection />
          </FadeInSection>

          {/* AI & Automation Section */}
          <FadeInSection delay={0.4} duration={1}>
            <AISection />
          </FadeInSection>

          {/* Drone Services Section */}
          <FadeInSection delay={0.5} duration={1}>
            <DroneServicesSection />
          </FadeInSection>

          {/* Newsletter Section */}
          {showNewsletterSection && (
            <FadeInSection delay={0.6} duration={1}>
              <NewsletterSection
                newsletterForm={newsletterForm}
                newsletterErrors={newsletterErrors}
                isNewsletterSubmitting={isNewsletterSubmitting}
                handleNewsletterChange={handleNewsletterChange}
                handleNewsletterSubmit={handleNewsletterSubmit}
              />
            </FadeInSection>
          )}

          {/* Contact Section */}
          <FadeInSection delay={0.7} duration={1}>
            <ContactSection
              contactForm={{
                name: contactForm.name,
                email: contactForm.email,
                phone: contactForm.phone || '',
                message: contactForm.message
              }}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              cooldownTime={cooldownTime}
              handleContactChange={handleContactChange}
              handleContactSubmit={handleContactSubmit}
              consentChecked={consentChecked}
              setConsentChecked={setConsentChecked}
              consentError={consentError}
            />
          </FadeInSection>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;