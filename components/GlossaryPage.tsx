import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GLOSSARY_TERMS } from '../constants/glossary';
import { SearchIcon, BookOpenIcon } from './Icons';

const GlossaryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedModule, setSelectedModule] = useState<string>('all');
    const location = useLocation();
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Check for query param to scroll to term
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const term = params.get('term');
        if (term) {
            setSearchTerm(term);
            // Optionally scroll to it if perfectly matched, but search filter does the job
        }
    }, [location.search]);

    const handleShare = (term: string) => {
        const url = `${window.location.origin}/#/glossary?term=${encodeURIComponent(term)}`;
        navigator.clipboard.writeText(url);
        setToastMessage(`Link for "${term}" copied!`);
        setTimeout(() => setToastMessage(null), 2500);
    };

    const modules = useMemo(() => {
        const set = new Set(GLOSSARY_TERMS.map(t => t.module));
        return ['all', ...Array.from(set).sort()];
    }, []);

    const filteredTerms = useMemo(() => {
        let terms = GLOSSARY_TERMS;
        if (selectedModule !== 'all') {
            terms = terms.filter(t => t.module === selectedModule);
        }
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            terms = terms.filter(item =>
                item.term.toLowerCase().includes(q) ||
                item.definition.toLowerCase().includes(q)
            );
        }
        return terms.sort((a, b) => a.term.localeCompare(b.term));
    }, [searchTerm, selectedModule]);

    // Group terms by first letter
    const groupedTerms = useMemo(() => {
        const groups: Record<string, typeof filteredTerms> = {};
        filteredTerms.forEach(term => {
            const letter = term.term[0].toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(term);
        });
        return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
    }, [filteredTerms]);

    const alphabet = useMemo(() => {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(letter =>
            groupedTerms.some(([l]) => l === letter)
        );
    }, [groupedTerms]);

    const scrollToLetter = (letter: string) => {
        const element = document.getElementById(`section-${letter}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="animate-fade-in max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                    <div className="flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl shadow-glow-md">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        {toastMessage}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <div className="text-center mb-10 pt-4">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/10 shadow-glow-primary mb-6">
                        <BookOpenIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black font-heading text-text-primary dark:text-dark-text-primary tracking-tight">
                        SAP <span className="gradient-text">Glossary</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                        The ultimate dictionary for SAP terminology, acronyms, and concepts.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-8 sticky top-24 z-30 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl p-4 rounded-3xl border border-border-color dark:border-dark-border-color shadow-sm transition-all">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search definitions..."
                                className="w-full pl-12 pr-4 py-3.5 text-sm bg-surface-light dark:bg-dark-surface-light border border-transparent focus:border-primary dark:focus:border-dark-primary rounded-2xl focus:ring-4 focus:ring-primary/10 dark:focus:ring-dark-primary/10 focus:outline-none transition-all"
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                            </div>
                        </div>
                        <select
                            value={selectedModule}
                            onChange={(e) => setSelectedModule(e.target.value)}
                            className="px-4 py-3.5 text-sm bg-surface-light dark:bg-dark-surface-light border border-transparent focus:border-primary dark:focus:border-dark-primary rounded-2xl focus:ring-4 focus:ring-primary/10 dark:focus:ring-dark-primary/10 focus:outline-none cursor-pointer"
                        >
                            {modules.map(m => (
                                <option key={m} value={m}>{m === 'all' ? 'All Modules' : m}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Terms grouped by letter */}
                <div className="space-y-10">
                    {groupedTerms.length > 0 ? groupedTerms.map(([letter, terms]) => (
                        <div key={letter} id={`section-${letter}`} className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent opacity-50">
                                    {letter}
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-border-color/50 to-transparent dark:from-dark-border-color/50" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {terms.map(({ term, definition, module }) => (
                                    <div key={term} className="group relative p-6 bg-surface dark:bg-dark-surface rounded-2xl border border-border-color dark:border-dark-border-color hover:border-primary/30 dark:hover:border-dark-primary/30 hover:shadow-card-hover dark:hover:shadow-dark-card-hover transition-all duration-300 hover:-translate-y-1">
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleShare(term)}
                                                className="p-2 text-text-secondary hover:text-primary bg-surface-light dark:bg-dark-surface-light rounded-lg hover:shadow-sm transition-all"
                                                title="Share this term"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.287.696.345 1.093m0-2.186l9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
                                            </button>
                                        </div>

                                        <div className="mb-3">
                                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-primary/80 to-primary-light/80 shadow-sm mb-2">
                                                {module}
                                            </span>
                                            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors leading-tight pr-8">
                                                {term}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                                            {definition}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-surface-light dark:bg-dark-surface-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <SearchIcon className="w-8 h-8 text-text-secondary/30" />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">No Definitions Found</h3>
                            <p className="text-text-secondary dark:text-dark-text-secondary mt-2">
                                Try searching for a different term or keyword.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Nav Sidebar (Desktop) */}
            <div className="hidden lg:block w-16 sticky top-32 h-fit">
                <div className="flex flex-col gap-1 items-center bg-surface/50 dark:bg-dark-surface/50 backdrop-blur-md p-2 rounded-2xl border border-border-color/50 dark:border-dark-border-color/50">
                    {alphabet.map(letter => (
                        <button
                            key={letter}
                            onClick={() => scrollToLetter(letter)}
                            className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GlossaryPage;
