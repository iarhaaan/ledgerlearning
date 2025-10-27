import React from 'react';
import { EnvelopeIcon } from './Icons';

const Contact: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8 sm:py-12">
      <div className="bg-surface dark:bg-dark-surface p-8 sm:p-12 rounded-xl shadow-lg border border-border-color dark:border-dark-border-color max-w-2xl w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-dark-primary/10 mb-6">
          <EnvelopeIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary dark:text-dark-text-primary tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary">
          We're here to help. For any questions about the platform, to report a bug, or for general inquiries, please feel free to send an email. We'll get back to you as soon as possible.
        </p>
        <div className="mt-8">
          <a
            href="mailto:f_saifi@outlook.com"
            className="inline-block px-6 sm:px-8 py-3 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary-focus dark:bg-dark-primary dark:hover:bg-dark-primary-focus transition-all duration-300 transform hover:scale-105"
          >
            f_saifi@outlook.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;