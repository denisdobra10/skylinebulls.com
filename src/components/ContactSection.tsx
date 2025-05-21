import React from 'react';
import { Send } from 'lucide-react';

interface ContactSectionProps {
  contactForm: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  formErrors: { [key: string]: string };
  isSubmitting: boolean;
  cooldownTime: number;
  handleContactChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleContactSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  consentChecked: boolean;
  setConsentChecked: (checked: boolean) => void;
  consentError: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  contactForm,
  formErrors,
  isSubmitting,
  cooldownTime,
  handleContactChange,
  handleContactSubmit,
  consentChecked,
  setConsentChecked,
  consentError
}) => (
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
            <a href="mailto:office@skylinebulls.com">office@skylinebulls.com</a>
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
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.name ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40 ${cooldownTime > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              required
              disabled={cooldownTime > 0}
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
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.email ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40 ${cooldownTime > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              required
              disabled={cooldownTime > 0}
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
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.phone ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40 ${cooldownTime > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                pattern="[0-9+\-\s]*"
                title="Please enter a valid phone number"
                disabled={cooldownTime > 0}
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
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${formErrors.message ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40 ${cooldownTime > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              required
              disabled={cooldownTime > 0}
            ></textarea>
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
            )}
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={e => setConsentChecked(e.target.checked)}
              className="mt-1"
              required
              disabled={cooldownTime > 0}
            />
            <label htmlFor="consent" className="text-sm text-white/70 select-none">
              I accept that my data will be processed for the purpose of responding to my inquiry, marketing updates, and other communications in accordance with the US and EU data protection laws.
            </label>
          </div>
          {consentError && <p className="text-sm text-red-500">{consentError}</p>}
          <button 
            type="submit" 
            className={`btn-primary relative ${cooldownTime > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting || cooldownTime > 0}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : cooldownTime > 0 ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                Please wait {cooldownTime}s
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default ContactSection; 