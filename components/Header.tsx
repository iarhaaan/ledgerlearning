import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useLenis } from '../contexts/LenisContext';
import { MoonIcon, SunIcon, SearchIcon, WrenchScrewdriverIcon } from './Icons';
import { MODULES } from '../constants/modules';
import type { Module, Chapter, Lesson } from '../types';
import { useThemeColor, COLOR_PALETTES } from '../contexts/ThemeColorContext';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-secondary hover:text-primary hover:bg-primary/10 dark:text-dark-text-secondary dark:hover:text-dark-primary dark:hover:bg-dark-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-dark-primary/30 transition-all duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
    );
};

const ColorPicker: React.FC = () => {
    const { activePalette, setPalette } = useThemeColor();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-surface-light dark:hover:bg-dark-surface-light transition-colors"
                title="Change Theme Color"
            >
                <div className="w-5 h-5 rounded-full border border-border-color dark:border-dark-border-color" style={{ backgroundColor: `rgb(${activePalette.colors.primary})` }} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 glass-card rounded-xl shadow-glow-md z-50 animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-border-color/50 dark:border-dark-border-color/50 mb-1">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Theme Color</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 px-3 py-2">
                        {COLOR_PALETTES.map((palette) => (
                            <button
                                key={palette.name}
                                onClick={() => {
                                    setPalette(palette.name);
                                    setIsOpen(false);
                                }}
                                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${activePalette.name === palette.name ? 'border-text-primary dark:border-dark-text-primary ring-2 ring-primary/30' : 'border-transparent'}`}
                                style={{ backgroundColor: `rgb(${palette.colors.primary})` }}
                                title={palette.label}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface SearchResult {
    lesson: Lesson;
    chapter: Chapter;
    module: Module;
}

const SearchBar: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);

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
                    const searchableText = `${lesson.title} ${lesson.details.definition} ${lesson.details.purpose} ${lesson.details.tCode || ''}`.toLowerCase();
                    if (searchableText.includes(lowerCaseQuery)) {
                        searchResults.push({ lesson, chapter, module });
                    }
                });
            });
        });
        setResults(searchResults.slice(0, 10));
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard shortcut: Ctrl+K / Cmd+K to focus search
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const input = searchRef.current?.querySelector('input');
                if (input) {
                    input.focus();
                    setIsFocused(true);
                }
            }
            if (e.key === 'Escape') {
                setIsFocused(false);
                const input = searchRef.current?.querySelector('input');
                if (input) input.blur();
            }
        };
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleResultClick = (url: string) => {
        setQuery('');
        setResults([]);
        setIsFocused(false);
        navigate(url);
    };

    const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
        if (!highlight.trim()) return <span>{text}</span>;
        const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
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
        <div className={`relative ${className}`} ref={searchRef}>
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Search modules..."
                    className="w-full pl-10 pr-20 py-2 text-sm bg-surface-light/50 dark:bg-dark-surface-light/50 border border-transparent focus:border-primary/50 dark:focus:border-dark-primary/50 hover:bg-surface-light dark:hover:bg-dark-surface-light rounded-full transition-all duration-300 focus:ring-2 focus:ring-primary/20 dark:focus:ring-dark-primary/20 focus:outline-none placeholder:text-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:w-full"
                />
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-primary dark:group-focus-within:text-dark-primary transition-colors" />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none gap-1">
                    <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-text-secondary/50 dark:text-dark-text-secondary/50 bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color rounded shadow-sm">
                        {isMac ? '⌘K' : 'Ctrl K'}
                    </kbd>
                </div>
            </div>
            {isFocused && query.length > 1 && (
                <div className="absolute mt-4 w-[120%] -left-[10%] max-h-96 overflow-y-auto glass-card rounded-2xl shadow-glow-lg border border-border-color/50 dark:border-dark-border-color/50 z-50 animate-fade-in-up scrollbar-thin">
                    <div className="sticky top-0 bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-md p-3 border-b border-border-color/50 dark:border-dark-border-color/50 z-10">
                        <span className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider pl-2">
                            Search Results
                        </span>
                    </div>
                    {results.length > 0 ? (
                        <ul className="py-2">
                            {results.map(({ lesson, chapter, module }, index) => {
                                const url = `/modules/${module.id}/chapters/${chapter.id}/lessons/${lesson.id}`;
                                return (
                                    <li key={`${lesson.id}-${index}`}>
                                        <button
                                            onClick={() => handleResultClick(url)}
                                            className="w-full text-left px-4 py-3 hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative z-10">
                                                <div className="font-semibold text-text-primary dark:text-dark-text-primary text-sm group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                                                    <Highlight text={lesson.title} highlight={query} />
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary mt-1">
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-surface-light dark:bg-dark-surface-light border border-border-color dark:border-dark-border-color text-primary dark:text-dark-primary font-medium shadow-sm">{module.title}</span>
                                                    <span className="opacity-50">/</span>
                                                    <span>{chapter.title}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="p-8 text-sm text-text-secondary dark:text-dark-text-secondary text-center flex flex-col items-center justify-center">
                            <div className="p-3 rounded-full bg-surface-light dark:bg-dark-surface-light mb-3">
                                <SearchIcon className="w-6 h-6 opacity-40" />
                            </div>
                            <span className="font-medium">No results found</span>
                            <span className="text-xs opacity-60 mt-1">Try searching for T-Codes or keywords</span>
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

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
    const { start, stop } = useLenis();

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 relative group overflow-hidden ${isActive
                    ? 'text-primary dark:text-dark-primary bg-primary/10 dark:bg-dark-primary/10 shadow-inner-glow'
                    : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-surface-light/50 dark:hover:bg-dark-surface-light/50'
                }`
            }
        >
            <span className="relative z-10">{children}</span>
        </NavLink>
    );
};

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const { start, stop } = useLenis();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Track scroll for floating effect enhancement
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            stop();
            document.body.style.overflow = 'hidden';
        } else {
            start();
            document.body.style.overflow = '';
        }
        return () => {
            start();
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen, start, stop]);

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-0 sm:pt-6'}`}>
                <header className={`
                    w-full max-w-7xl mx-auto transition-all duration-500
                    ${scrolled
                        ? 'glass shadow-lg sm:rounded-full sm:mx-6'
                        : 'bg-transparent border-transparent sm:mx-6'
                    }
                    ${!scrolled && 'sm:bg-surface/50 sm:dark:bg-dark-surface/50 sm:backdrop-blur-md sm:border sm:border-border-color/30 sm:dark:border-dark-border-color/30 sm:rounded-full shadow-sm'}
                `}>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link to="/" className="flex items-center space-x-2.5 group flex-shrink-0 mr-8">
                                <span className="text-xl font-heading font-extrabold text-text-primary dark:text-dark-text-primary tracking-tight">
                                    Ledger<span className="text-primary dark:text-dark-primary">Learning</span>
                                </span>
                            </Link>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
                                <div className="p-1 rounded-full bg-surface-light/50 dark:bg-dark-surface-light/50 border border-border-color/50 dark:border-dark-border-color/50 backdrop-blur-sm flex items-center space-x-1">
                                    <NavItem to="/">Dashboard</NavItem>
                                    <NavItem to="/glossary">Glossary</NavItem>
                                    <NavItem to="/tcodes">T-Codes</NavItem>
                                    <NavItem to="/spro">SPRO</NavItem>
                                    <NavItem to="/scenarios">Scenarios</NavItem>
                                </div>
                            </nav>

                            {/* Right Side Actions */}
                            <div className="hidden md:flex items-center space-x-4">
                                <div className="w-48 lg:w-64">
                                    <SearchBar />
                                </div>
                                <div className="flex items-center space-x-2 border-l border-border-color/50 dark:border-dark-border-color/50 pl-4">
                                    <ColorPicker />
                                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                                    <Link
                                        to="/flashcards"
                                        className="hidden lg:flex items-center justify-center p-2 rounded-full text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                                        title="Flashcards"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" /></svg>
                                    </Link>
                                    <Link
                                        to="/certification"
                                        className="hidden lg:flex items-center justify-center p-2 rounded-full text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                                        title="Certification Simulator"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l15.482 0m-15.482 0a2.25 2.25 0 01-1.883-2.264l.842-5.611a2.25 2.25 0 012.264-1.883H12l3.375 0a2.25 2.25 0 012.264 1.883l.842 5.611a2.25 2.25 0 01-1.883 2.264m-17.764 0h17.764" /></svg>
                                    </Link>
                                    <Link
                                        to="/cheatsheets"
                                        className="hidden lg:flex items-center justify-center p-2 rounded-full text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                                        title="Cheatsheets"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile controls */}
                            <div className="flex items-center space-x-3 md:hidden">
                                <ColorPicker />
                                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-xl text-text-secondary dark:text-dark-text-secondary hover:bg-surface-light dark:hover:bg-dark-surface-light focus:outline-none transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* Spacer to prevent content from hiding behind fixed header */}
            <div className="h-24 hidden sm:block"></div>
            <div className="h-16 sm:hidden"></div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-background/80 dark:bg-dark-background/80 backdrop-blur-md animate-fade-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    {/* Menu Panel */}
                    <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-surface dark:bg-dark-surface border-l border-border-color dark:border-dark-border-color shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-border-color dark:border-dark-border-color">
                            <span className="text-lg font-heading font-bold text-text-primary dark:text-dark-text-primary">Navigation</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-surface-light dark:hover:bg-dark-surface-light text-text-secondary"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-5 flex-1 overflow-y-auto">
                            <SearchBar className="mb-8" />

                            <nav className="space-y-2">
                                <NavItem to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">Dashboard</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/glossary" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">Glossary</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/tcodes" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">T-Codes</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/spro" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">SPRO Explorer</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/scenarios" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">Scenarios</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/flashcards" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">Flashcards</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/certification" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">Certification Simulator</span>
                                    </div>
                                </NavItem>

                                <NavItem to="/cheatsheets" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="flex items-center gap-4 py-1">
                                        <span className="text-base font-medium">Cheatsheets</span>
                                    </div>
                                </NavItem>
                            </nav>
                        </div>

                        <div className="p-5 border-t border-border-color dark:border-dark-border-color bg-surface-light/30 dark:bg-dark-surface-light/30">
                            <NavItem to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-focus rounded-xl shadow-glow-sm">
                                    Contact Support
                                </span>
                            </NavItem>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;