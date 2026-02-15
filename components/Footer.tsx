import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface dark:bg-dark-surface border-t border-border-color dark:border-dark-border-color mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 mb-4 group">
              <span className="text-2xl font-heading font-extrabold text-text-primary dark:text-dark-text-primary tracking-tight">
                Ledger<span className="text-primary dark:text-dark-primary">Learning</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed max-w-xs">
              A modern, comprehensive LMS designed to help you master key SAP modules with expert-crafted content.
            </p>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-sm font-bold text-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-4">Modules</h3>
            <ul className="space-y-2.5">
              <li><Link to="/modules/fico/chapters/fico-ch1/lessons/fico-ch1-l1" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">SAP FICO</Link></li>
              <li><Link to="/modules/sd/chapters/sd-ch1/lessons/sd-ch1-l1" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">SAP SD</Link></li>
              <li><Link to="/modules/mm/chapters/mm-ch1/lessons/mm-ch1-l1" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">SAP MM</Link></li>
              <li><Link to="/modules/abap/chapters/abap-ch1/lessons/abap-ch1-l1" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">SAP ABAP</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link to="/glossary" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">SAP Glossary</Link></li>
              <li><Link to="/tcodes" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">T-Code Index</Link></li>
              <li><Link to="/spro" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">SPRO Explorer</Link></li>
              <li><Link to="/contact" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-bold text-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-4">About</h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-text-secondary dark:text-dark-text-secondary">Built with React & TypeScript</li>
              <li className="text-sm text-text-secondary dark:text-dark-text-secondary">Styled with Tailwind CSS</li>
              <li><a href="mailto:f_saifi@outlook.com" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">f_saifi@outlook.com</a></li>
              <li><a href="https://linkedin.com/in/farhansaifi7" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border-color dark:border-dark-border-color flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
            &copy; {new Date().getFullYear()} Ledger Learning. All Rights Reserved.
          </p>
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary flex items-center gap-1.5">
            Crafted with <span className="text-error dark:text-dark-error text-sm">❤️</span> by <span className="font-semibold text-text-primary dark:text-dark-text-primary">Farhan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;