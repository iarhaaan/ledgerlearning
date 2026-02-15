import React, { useState, useEffect } from 'react';
import { GLOSSARY_TERMS } from '../constants/glossary';
import { MODULES } from '../constants/modules';
import { AcademicCapIcon, CheckCircleIcon, XCircleIcon } from './Icons';

// Helper to get T-Codes
const getTCodes = () => {
    const tcodes: { term: string; definition: string; module: string; type: 'T-Code' }[] = [];
    MODULES.forEach(module => {
        module.chapters.forEach(chapter => {
            chapter.lessons.forEach(lesson => {
                if (lesson.details.tCode && lesson.details.tCode !== 'N/A') {
                    const codes = lesson.details.tCode.split(',').map(c => c.trim().split('/')[0].trim());
                    codes.forEach(code => {
                        if (code && !code.includes(' ')) {
                            tcodes.push({
                                term: code,
                                definition: `Transaction code for: ${lesson.title}`,
                                module: module.title,
                                type: 'T-Code'
                            });
                        }
                    });
                }
            });
        });
    });
    return tcodes;
};

interface Flashcard {
    id: string;
    term: string;
    definition: string;
    module: string;
    type: 'Glossary' | 'T-Code';
}

const FlashcardsPage: React.FC = () => {
    const [mode, setMode] = useState<'Glossary' | 'T-Code' | 'Mixed'>('Mixed');
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [streak, setStreak] = useState(0);
    const [completed, setCompleted] = useState(false);

    // Initialize cards
    useEffect(() => {
        const glossaryCards: Flashcard[] = GLOSSARY_TERMS.map((t, i) => ({ ...t, type: 'Glossary', id: `g-${i}` }));
        const tcodeCards: Flashcard[] = getTCodes().map((t, i) => ({ ...t, type: 'T-Code', id: `t-${i}` }));

        let allCards = [];
        if (mode === 'Glossary') allCards = glossaryCards;
        else if (mode === 'T-Code') allCards = tcodeCards;
        else allCards = [...glossaryCards, ...tcodeCards];

        // Shuffle
        setCards(allCards.sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setCompleted(false);
        setStreak(0);
        setIsFlipped(false);
    }, [mode]);

    const handleFlip = () => setIsFlipped(!isFlipped);

    const handleNext = (known: boolean) => {
        if (known) setStreak(s => s + 1);
        else setStreak(0);

        setIsFlipped(false);
        setTimeout(() => {
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(c => c + 1);
            } else {
                setCompleted(true);
            }
        }, 150); // Wait for flip back
    };

    const restart = () => {
        setCards(prev => [...prev].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        setCompleted(false);
        setStreak(0);
        setIsFlipped(false);
    };

    if (cards.length === 0) return null; // Loading

    const currentCard = cards[currentIndex];
    const progress = Math.round(((currentIndex) / cards.length) * 100);

    return (
        <div className="animate-fade-in max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center py-12">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-light dark:bg-dark-surface-light text-xs font-semibold text-text-secondary dark:text-dark-text-secondary border border-border-color dark:border-dark-border-color mb-4">
                    <span className={`w-2 h-2 rounded-full ${streak > 2 ? 'bg-success animate-pulse' : 'bg-text-secondary'}`}></span>
                    Streak: {streak}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-text-primary dark:text-dark-text-primary mb-2">
                    Flash<span className="gradient-text">cards</span>
                </h1>
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                    {['Mixed', 'Glossary', 'T-Code'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m as any)}
                            className={`px-4 py-1.5 rounded-full transition-all ${mode === m
                                ? 'bg-primary text-white shadow-glow-sm'
                                : 'bg-surface dark:bg-dark-surface text-text-secondary hover:bg-surface-light dark:hover:bg-dark-surface-light'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            {completed ? (
                <div className="text-center bg-surface dark:bg-dark-surface p-12 rounded-3xl border border-border-color dark:border-dark-border-color shadow-card dark:shadow-dark-card animate-scale-in">
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircleIcon className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">Session Complete!</h2>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-8">You've reviewed all {cards.length} cards.</p>
                    <button
                        onClick={restart}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-glow-md transition-all active:scale-95"
                    >
                        Start New Session
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-xl perspective-1000">
                    <div className="relative h-96 w-full cursor-pointer group" onClick={handleFlip}>
                        {/* Progress Bar */}
                        <div className="absolute -top-8 left-0 right-0 h-1.5 bg-surface-light dark:bg-dark-surface-light rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-surface dark:bg-dark-surface rounded-3xl border border-border-color dark:border-dark-border-color shadow-card-hover dark:shadow-dark-card-hover flex flex-col items-center justify-center p-8 text-center hover:border-primary/30 transition-colors">
                                <span className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider text-text-secondary/50">{currentCard.type}</span>
                                <span className="absolute top-6 right-6 text-xs font-bold text-primary dark:text-dark-primary bg-primary/10 dark:bg-dark-primary/10 px-2 py-1 rounded-md">{currentCard.module}</span>

                                <h3 className="text-4xl font-black text-text-primary dark:text-dark-text-primary mb-4 break-words max-w-full">
                                    {currentCard.term}
                                </h3>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary absolute bottom-8 animate-pulse">
                                    Click or Space to flip
                                </p>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-surface-light dark:bg-dark-surface-light rounded-3xl border border-primary/20 dark:border-dark-primary/20 shadow-glow-sm flex flex-col items-center justify-center p-8 text-center scroll-y-auto">
                                <h3 className="text-xl font-bold text-primary dark:text-dark-primary mb-4 border-b border-border-color dark:border-dark-border-color pb-2">
                                    {currentCard.term}
                                </h3>
                                <p className="text-lg text-text-primary dark:text-dark-text-primary leading-relaxed">
                                    {currentCard.definition}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-4 mt-8">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                            className="flex-1 py-4 rounded-xl font-bold text-error bg-error/10 hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
                        >
                            <XCircleIcon className="w-5 h-5" />
                            Don't Know
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                            className="flex-1 py-4 rounded-xl font-bold text-success bg-success/10 hover:bg-success/20 transition-colors flex items-center justify-center gap-2"
                        >
                            <CheckCircleIcon className="w-5 h-5" />
                            Know It
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
};

export default FlashcardsPage;
