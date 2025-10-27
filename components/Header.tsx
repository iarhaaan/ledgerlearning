import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { LogoIcon, MoonIcon, SunIcon, SearchIcon } from './Icons';
import { MODULES } from '../constants/modules';
import type { Module, Chapter, Lesson } from '../types';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-secondary hover:bg-surface-light dark:text-dark-text-secondary dark:hover:bg-dark-surface-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-background"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
    );
};

interface SearchResult {
    lesson: Lesson;
    chapter: Chapter;
    module: Module;
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const searchResults: SearchResult[] = [];
        const lowerCaseQuery = query.toLowerCase();

        MODULES.forEach(module => {
            module.chapters.forEach(chapter => {
                chapter.lessons.forEach(lesson => {
                    const searchableText = `${lesson.title} ${lesson.details.definition} ${lesson.details.purpose}`.toLowerCase();
                    if (searchableText.includes(lowerCaseQuery)) {
                        searchResults.push({ lesson, chapter, module });
                    }
                });
            });
        });
        setResults(searchResults);
    }, [query]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleResultClick = (url: string) => {
        setQuery('');
        setResults([]);
        setIsFocused(false);
        navigate(url);
    };

    const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <strong key={i} className="text-primary dark:text-dark-primary font-bold">{part}</strong>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };


    return (
        <div className="relative w-full max-w-xs" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Search lessons..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-surface-light dark:bg-dark-surface-light border border-transparent rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
                </div>
            </div>
            {isFocused && query.length > 1 && (
                <div className="absolute mt-2 w-full max-h-96 overflow-y-auto bg-surface dark:bg-dark-surface rounded-md shadow-lg border border-border-color dark:border-dark-border-color z-30">
                    {results.length > 0 ? (
                         <ul>
                            {results.map(({ lesson, chapter, module }, index) => {
                                const url = `/modules/${module.id}/chapters/${chapter.id}/lessons/${lesson.id}`;
                                return (
                                    <li key={`${lesson.id}-${index}`}>
                                        <button
                                            onClick={() => handleResultClick(url)}
                                            className="w-full text-left px-4 py-3 hover:bg-surface-light dark:hover:bg-dark-surface-light transition-colors"
                                        >
                                            <div className="font-semibold text-text-primary dark:text-dark-text-primary text-sm">
                                                <Highlight text={lesson.title} highlight={query} />
                                            </div>
                                            <div className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                                                in {chapter.title} ({module.title})
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="p-4 text-sm text-text-secondary dark:text-dark-text-secondary text-center">
                            No results found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const NavItem: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
    const baseClasses = "text-sm font-medium text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-dark-primary transition-colors";
    const activeClasses = "text-primary dark:text-dark-primary";
    
    return (
         <NavLink to={to} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : ''}`}>
            {children}
        </NavLink>
    );
};

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm border-b border-border-color dark:border-dark-border-color sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-auto text-primary dark:text-dark-primary" />
            <span className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
              Ledger Learning
            </span>
          </Link>
          <div className="flex-1 flex justify-center px-8 hidden md:flex">
             <SearchBar />
          </div>
          <nav className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
                <NavItem to="/">Dashboard</NavItem>
                <NavItem to="/glossary">Glossary</NavItem>
                <NavItem to="/tcodes">T-Codes</NavItem>
                <NavItem to="/spro">SPRO</NavItem>
            </div>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Link to="/contact" className="px-3 py-2 sm:px-4 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-focus dark:bg-dark-primary dark:hover:bg-dark-primary-focus transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <div className="md:hidden pt-2 pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;