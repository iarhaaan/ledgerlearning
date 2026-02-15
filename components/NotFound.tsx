import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6">
                <span className="text-8xl sm:text-9xl font-black gradient-text select-none">404</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-3">
                Page Not Found
            </h1>
            <p className="text-base text-text-secondary dark:text-dark-text-secondary mb-8 max-w-md">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                    Back to Dashboard
                </Link>
                <Link
                    to="/glossary"
                    className="inline-flex items-center px-6 py-3 text-sm font-semibold text-primary dark:text-dark-primary border border-primary/30 dark:border-dark-primary/30 rounded-xl hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-all duration-200"
                >
                    Browse Glossary
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
