import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../constants/glossary';
import { SearchIcon, BookOpenIcon } from './Icons';

const GlossaryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTerms = useMemo(() => {
        if (!searchTerm) {
            return GLOSSARY_TERMS;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return GLOSSARY_TERMS.filter(item =>
            item.term.toLowerCase().includes(lowercasedFilter) ||
            item.definition.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm]);

    return (
        <div>
            <div className="text-center mb-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-dark-primary/10 mb-6">
                    <BookOpenIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary sm:text-5xl tracking-tight">
                    SAP Glossary
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary">
                    A comprehensive index of key terms and acronyms used throughout the SAP ecosystem.
                </p>
            </div>
            
            <div className="mb-8 max-w-2xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search terms or definitions..."
                        className="w-full pl-12 pr-4 py-3 text-base bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color rounded-full focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredTerms.length > 0 ? filteredTerms.map(({ term, definition, module }) => (
                    <div key={term} className="p-6 bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color">
                        <div className="flex justify-between items-start">
                             <h3 className="font-bold text-primary dark:text-dark-primary text-xl">{term}</h3>
                             <span className="text-xs font-semibold uppercase tracking-wider text-white bg-accent/80 dark:bg-dark-accent/80 px-2 py-1 rounded-full">{module}</span>
                        </div>
                        <p className="text-base text-text-secondary dark:text-dark-text-secondary mt-2">{definition}</p>
                    </div>
                )) : (
                     <div className="text-center py-10 text-text-secondary dark:text-dark-text-secondary">
                        No terms found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlossaryPage;
