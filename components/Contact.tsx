import React from 'react';
import { EnvelopeIcon, LinkedInIcon } from './Icons';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto text-center">
      <div className="mb-10 pt-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 dark:bg-dark-primary/10 mb-6">
          <EnvelopeIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-text-primary dark:text-dark-text-primary tracking-tight">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="mt-4 text-base text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-lg mx-auto">
          Have questions, feedback, or suggestions? Feel free to reach out — I'd love to hear from you.
        </p>
      </div>

      <div className="bg-surface dark:bg-dark-surface rounded-2xl border border-border-color dark:border-dark-border-color shadow-card dark:shadow-dark-card p-8 sm:p-10">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-2">Email</h2>
            <a
              href="mailto:f_saifi@outlook.com"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary dark:text-dark-primary hover:text-primary-focus dark:hover:text-dark-primary-light transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5" />
              f_saifi@outlook.com
            </a>
          </div>

          <div className="w-full h-px bg-border-color dark:bg-dark-border-color" />

          <div>
            <h2 className="text-sm font-bold text-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-2">Creator</h2>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              <span className="font-semibold text-text-primary dark:text-dark-text-primary">Farhan</span> — Developer & SAP Enthusiast
            </p>
          </div>

          <div className="w-full h-px bg-border-color dark:bg-dark-border-color" />

          <div>
            <h2 className="text-sm font-bold text-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-2">Socials</h2>
            <a
              href="https://linkedin.com/in/farhansaifi7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary dark:text-dark-primary hover:text-primary-focus dark:hover:text-dark-primary-light transition-colors"
            >
              <LinkedInIcon className="h-5 w-5" />
              LinkedIn Profile
            </a>
          </div>

          <div className="pt-4">
            <a
              href="mailto:f_saifi@outlook.com?subject=Ledger Learning Inquiry"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-glow-sm hover:shadow-glow-md dark:shadow-dark-glow-sm dark:hover:shadow-dark-glow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <EnvelopeIcon className="h-4.5 w-4.5 mr-2" />
              Send an Email
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-text-secondary dark:text-dark-text-secondary">
        Replies are typically within 24–48 hours.
      </p>
    </div>
  );
};

export default Contact;