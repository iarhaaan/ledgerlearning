import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import { SearchIcon, CommandLineIcon, StarIcon } from './Icons';

interface TCodeEntry {
    code: string;
    lessonTitle: string;
    chapterTitle: string;
    moduleTitle: string;
    moduleId: string;
    chapterId: string;
    lessonId: string;
}

const TCodeIndexPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedModule, setSelectedModule] = useState<string>('all');
    const [favorites, setFavorites] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('favorite-tcodes');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    useEffect(() => {
        localStorage.setItem('favorite-tcodes', JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    const toggleFavorite = (e: React.MouseEvent, code: string) => {
        e.preventDefault();
        e.stopPropagation();
        const newFavorites = new Set(favorites);
        if (newFavorites.has(code)) {
            newFavorites.delete(code);
        } else {
            newFavorites.add(code);
        }
        setFavorites(newFavorites);
    };

    const allTCodes = useMemo(() => {
        const collected: TCodeEntry[] = [];
        const seen = new Set<string>();
        MODULES.forEach(module => {
            module.chapters.forEach(chapter => {
                chapter.lessons.forEach(lesson => {
                    if (lesson.details.tCode && lesson.details.tCode !== 'N/A') {
                        const partsByComma = lesson.details.tCode.split(',');
                        partsByComma.forEach(part => {
                            const cleanedPart = part.replace(/\s*\([^)]*\)/g, '').trim();
                            if (!cleanedPart) return;
                            const partsBySlash = cleanedPart.split('/');
                            partsBySlash.forEach(subPart => {
                                const finalCode = subPart.trim();
                                if (finalCode && !finalCode.includes(' ')) {
                                    const uniqueKey = `${finalCode}-${lesson.id}`;
                                    if (!seen.has(uniqueKey)) {
                                        collected.push({
                                            code: finalCode,
                                            lessonTitle: lesson.title,
                                            chapterTitle: chapter.title,
                                            moduleTitle: module.title,
                                            moduleId: module.id,
                                            chapterId: chapter.id,
                                            lessonId: lesson.id
                                        });
                                        seen.add(uniqueKey);
                                    }
                                }
                            });
                        });
                    }
                });
            });
        });
        return collected.sort((a, b) => a.code.localeCompare(b.code));
    }, []);

    const filteredTCodes = useMemo(() => {
        let codes = allTCodes;
        if (showFavoritesOnly) {
            codes = codes.filter(t => favorites.has(t.code));
        }
        if (selectedModule !== 'all') {
            codes = codes.filter(t => t.moduleTitle === selectedModule);
        }
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            codes = codes.filter(item =>
                item.code.toLowerCase().includes(q) ||
                item.lessonTitle.toLowerCase().includes(q)
            );
        }
        return codes;
    }, [searchTerm, selectedModule, allTCodes, showFavoritesOnly, favorites]);

    const moduleNames = useMemo(() => {
        const set = new Set(allTCodes.map(t => t.moduleTitle));
        return ['all', ...Array.from(set).sort()];
    }, [allTCodes]);

    return (
        <div className="animate-fade-in max-w-7xl mx-auto">
            <div className="text-center mb-10 pt-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/10 shadow-glow-accent mb-6">
                    <CommandLineIcon className="h-8 w-8 text-accent dark:text-dark-accent" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-black font-heading text-text-primary dark:text-dark-text-primary tracking-tight">
                    T-Code <span className="gradient-text">Master Index</span>
                </h1>
                <p className="mt-4 max-w-xl mx-auto text-lg text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    Instantly search, bookmark, and master all {allTCodes.length} transaction codes.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mb-8 p-4 bg-surface dark:bg-dark-surface rounded-3xl border border-border-color dark:border-dark-border-color shadow-sm sticky top-24 z-30 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by T-Code or description..."
                            className="w-full pl-12 pr-4 py-3.5 text-sm bg-surface-light dark:bg-dark-surface-light border border-transparent focus:border-accent dark:focus:border-dark-accent rounded-2xl focus:ring-4 focus:ring-accent/10 dark:focus:ring-dark-accent/10 focus:outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary group-focus-within:text-accent dark:group-focus-within:text-dark-accent transition-colors" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedModule}
                            onChange={(e) => setSelectedModule(e.target.value)}
                            className="px-4 py-3.5 text-sm bg-surface-light dark:bg-dark-surface-light border border-transparent focus:border-accent dark:focus:border-dark-accent rounded-2xl focus:ring-4 focus:ring-accent/10 dark:focus:ring-dark-accent/10 focus:outline-none cursor-pointer"
                        >
                            <option value="all">All Modules</option>
                            {moduleNames.filter(m => m !== 'all').map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                            className={`p-3.5 rounded-2xl border transition-all duration-300 ${showFavoritesOnly
                                ? 'bg-warning/10 border-warning text-warning shadow-sm'
                                : 'bg-surface-light dark:bg-dark-surface-light border-transparent text-text-secondary hover:text-warning'
                                }`}
                            title={showFavoritesOnly ? "Show All" : "Show Favorites Only"}
                        >
                            <StarIcon className={`h-5 w-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
                    Found <span className="text-text-primary dark:text-dark-text-primary font-bold">{filteredTCodes.length}</span> T-Codes
                </div>
                {favorites.size > 0 && (
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        <span className="text-warning font-bold">{favorites.size}</span> saved
                    </div>
                )}
            </div>

            {/* T-Code Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTCodes.length > 0 ? filteredTCodes.map((tcode, index) => {
                    const isFav = favorites.has(tcode.code);
                    return (
                        <Link
                            key={`${tcode.code}-${index}`}
                            to={`/modules/${tcode.moduleId}/chapters/${tcode.chapterId}/lessons/${tcode.lessonId}`}
                            className="group relative flex flex-col p-5 bg-surface dark:bg-dark-surface rounded-2xl border border-border-color dark:border-dark-border-color hover:border-accent/50 dark:hover:border-dark-accent/50 hover:shadow-card-hover dark:hover:shadow-dark-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                                <code className="text-xl font-bold font-mono text-accent dark:text-dark-accent bg-accent/5 dark:bg-dark-accent/5 px-3 py-1.5 rounded-lg border border-accent/10 dark:border-dark-accent/10 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                    {tcode.code}
                                </code>
                                <button
                                    onClick={(e) => toggleFavorite(e, tcode.code)}
                                    className={`p-2 rounded-full transition-all ${isFav
                                        ? 'text-warning hover:bg-warning/10'
                                        : 'text-text-secondary/30 hover:text-warning hover:bg-warning/10'
                                        }`}
                                >
                                    <StarIcon className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="mt-auto relative z-10">
                                <h3 className="text-base font-bold text-text-primary dark:text-dark-text-primary group-hover:text-accent dark:group-hover:text-dark-accent transition-colors line-clamp-1 mb-1">
                                    {tcode.lessonTitle}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                                    <span className="bg-surface-light dark:bg-dark-surface-light px-2 py-0.5 rounded font-medium">{tcode.moduleTitle}</span>
                                    <span className="opacity-50">•</span>
                                    <span className="truncate">{tcode.chapterTitle}</span>
                                </div>
                            </div>
                        </Link>
                    );
                }) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-surface-light dark:bg-dark-surface-light rounded-2xl flex items-center justify-center mb-4">
                            <CommandLineIcon className="w-8 h-8 text-text-secondary/30" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">No T-Codes Found</h3>
                        <p className="text-text-secondary dark:text-dark-text-secondary max-w-xs mx-auto mt-2">
                            We couldn't find any transaction codes matching "{searchTerm}".
                        </p>
                        {showFavoritesOnly && (
                            <button
                                onClick={() => setShowFavoritesOnly(false)}
                                className="mt-4 text-sm font-bold text-accent hover:underline"
                            >
                                View all T-Codes
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TCodeIndexPage;