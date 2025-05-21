import React from 'react';
import { Send, Phone, MapPin } from 'lucide-react';

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
          <div className="flex items-center gap-2 text-white/70 mb-2">
            <Send className="h-5 w-5" />
            <span>office@skylinebulls.com</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 mb-2">
            <Phone className="h-5 w-5" />
            <a href="tel:+13122593536" className="hover:underline">(312)-259-3536</a>
          </div>
          <div className="flex items-center gap-2 text-white/70 mb-2">
            <MapPin className="h-5 w-5" />
            <span>4926 Lunt Ave, Skokie, IL 60077</span>
          </div>
          <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Skyline Bulls Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.073964479624!2d-87.7530736845536!3d42.0263709792107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fcf6e2e2e2e2f%3A0x1234567890abcdef!2s4926%20Lunt%20Ave%2C%20Skokie%2C%20IL%2060077%2C%20USA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="250px"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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