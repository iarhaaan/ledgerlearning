import React from 'react';
import { LogoIcon } from './Icons';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-dark-background text-text-primary dark:text-dark-text-primary p-4 transition-colors duration-300">
      <div className="text-center max-w-2xl animate-fade-in-up">
        <LogoIcon className="h-20 w-auto text-primary dark:text-dark-primary mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary">
          Welcome to Ledger Learning
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary">
          Your comprehensive, minimalist gateway to mastering SAP. Dive into expert-crafted courses for FICO, SD, MM, and ABAP.
        </p>
        <div className="mt-10">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 text-lg font-bold text-white bg-primary rounded-lg shadow-lg hover:bg-primary-focus dark:bg-dark-primary dark:hover:bg-dark-primary-focus transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 dark:focus:ring-dark-primary/50"
          >
            Get Started
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
