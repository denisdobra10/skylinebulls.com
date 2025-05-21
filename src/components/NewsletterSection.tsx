import React from 'react';

const NewsletterSection = ({
  newsletterForm,
  newsletterErrors,
  isNewsletterSubmitting,
  handleNewsletterChange,
  handleNewsletterSubmit
}: {
  newsletterForm: { email: string };
  newsletterErrors: { email?: string };
  isNewsletterSubmitting: boolean;
  handleNewsletterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewsletterSubmit: (e: React.FormEvent) => void;
}) => (
  <section id="newsletter" className="section bg-[--primary-red]/5">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
      <p className="text-white/70 mb-8 max-w-2xl">
        Subscribe to our newsletter for the latest updates in technology and drone innovations.
      </p>
      <form onSubmit={handleNewsletterSubmit} className="max-w-md">
        <div className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              value={newsletterForm.email}
              onChange={handleNewsletterChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${newsletterErrors.email ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-white/40`}
              required
            />
            {newsletterErrors.email && (
              <p className="mt-1 text-sm text-red-500">{newsletterErrors.email}</p>
            )}
          </div>
          <button 
            type="submit" 
            className="btn-primary relative"
            disabled={isNewsletterSubmitting}
          >
            {isNewsletterSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </form>
    </div>
  </section>
);

export default NewsletterSection; 