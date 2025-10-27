import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import { SearchIcon, CommandLineIcon } from './Icons';

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
        if (!searchTerm) {
            return allTCodes;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return allTCodes.filter(item =>
            item.code.toLowerCase().includes(lowercasedFilter) ||
            item.lessonTitle.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, allTCodes]);

    return (
        <div>
            <div className="text-center mb-12">
                 <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-dark-primary/10 mb-6">
                    <CommandLineIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
                </div>
                <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary sm:text-5xl tracking-tight">
                    T-Code Index
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary">
                    A searchable quick reference for all transaction codes mentioned in the courses.
                </p>
            </div>
            
             <div className="mb-8 max-w-2xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by T-Code or description..."
                        className="w-full pl-12 pr-4 py-3 text-base bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color rounded-full focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent focus:outline-none"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-text-secondary dark:text-dark-text-secondary" />
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {filteredTCodes.length > 0 ? filteredTCodes.map((tcode, index) => (
                    <Link 
                        key={`${tcode.code}-${index}`}
                        to={`/modules/${tcode.moduleId}/chapters/${tcode.chapterId}/lessons/${tcode.lessonId}`}
                        className="block p-4 bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color hover:border-primary dark:hover:border-dark-primary hover:bg-surface-light dark:hover:bg-dark-surface-light transition-all"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-primary dark:text-dark-primary text-lg"><code>{tcode.code}</code></h3>
                            <span className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">{tcode.moduleTitle}</span>
                        </div>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
                            Mentioned in: <span className="font-medium text-text-primary dark:text-dark-text-primary">{tcode.lessonTitle}</span> ({tcode.chapterTitle})
                        </p>
                    </Link>
                )) : (
                     <div className="text-center py-10 text-text-secondary dark:text-dark-text-secondary">
                        No T-Codes found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TCodeIndexPage;