import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border-color dark:bg-dark-background dark:border-dark-border-color">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-text-secondary dark:text-dark-text-secondary text-sm">
        <p>&copy; {new Date().getFullYear()} Ledger Learning. All Rights Reserved.</p>
        <p className="mt-2 text-xs">
          Crafted with <span className="text-red-500">❤️</span> by Farhan
        </p>
      </div>
    </footer>
  );
};

export default Footer;