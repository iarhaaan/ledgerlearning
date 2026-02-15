import React, { useState, useEffect } from 'react';
import { SCENARIOS, type Scenario } from '../constants/scenarios';
import { CheckCircleIcon, XCircleIcon, CommandLineIcon, WrenchScrewdriverIcon, DocumentTextIcon, FolderIcon } from './Icons';
import confetti from 'canvas-confetti';

interface ScenarioState {
    selectedOption: string | null;
    isSubmitted: boolean;
}

const ScenarioMode: React.FC = () => {
    const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

    // Track state per scenario ID
    const [scenarioStates, setScenarioStates] = useState<Record<string, ScenarioState>>({});
    const [resolvedScenarios, setResolvedScenarios] = useState<Set<string>>(new Set());

    const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId);

    // Get current state or default
    const currentState = activeScenarioId ? scenarioStates[activeScenarioId] || { selectedOption: null, isSubmitted: false } : { selectedOption: null, isSubmitted: false };

    const handleSelectOption = (optionId: string) => {
        if (!activeScenarioId || currentState.isSubmitted) return;

        setScenarioStates(prev => ({
            ...prev,
            [activeScenarioId]: {
                ...prev[activeScenarioId] || { isSubmitted: false },
                selectedOption: optionId,
                isSubmitted: false
            }
        }));
    };

    const handleSubmit = () => {
        if (!activeScenarioId || !currentState.selectedOption || !activeScenario) return;

        setScenarioStates(prev => ({
            ...prev,
            [activeScenarioId]: {
                ...prev[activeScenarioId],
                isSubmitted: true
            }
        }));

        const correct = activeScenario.options.find(o => o.id === currentState.selectedOption)?.isCorrect;
        if (correct) {
            confetti({
                particleCount: 150,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#10B981', '#3B82F6']
            });
            setResolvedScenarios(prev => new Set(prev).add(activeScenario.id));
        }
    };

    const handleNext = () => {
        setActiveScenarioId(null);
    };

    const handleRetry = () => {
        if (!activeScenarioId) return;
        setScenarioStates(prev => ({
            ...prev,
            [activeScenarioId]: {
                selectedOption: null,
                isSubmitted: false
            }
        }));
    };

    const getTypeIcon = (type: Scenario['type']) => {
        switch (type) {
            case 'BUG_FIX': return <CommandLineIcon className="w-4 h-4 text-error" />;
            case 'REQUIREMENT': return <WrenchScrewdriverIcon className="w-4 h-4 text-warning" />;
            case 'BLUEPRINT': return <DocumentTextIcon className="w-4 h-4 text-info" />;
            case 'OUTAGE': return <CommandLineIcon className="w-4 h-4 text-error" />;
            default: return <FolderIcon className="w-4 h-4" />;
        }
    };

    if (!activeScenario) {
        return (
            <div className="animate-fade-in max-w-5xl mx-auto pb-12">
                <header className="mb-6 sm:mb-10 text-center">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4 border border-primary/20">
                        <WrenchScrewdriverIcon className="w-3.5 h-3.5 mr-1" />
                        Consultancy Simulator
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-text-primary dark:text-dark-text-primary tracking-tight mb-4">
                        Consultant Inbox
                    </h1>
                    <p className="text-text-secondary dark:text-dark-text-secondary max-w-xl mx-auto text-lg px-4">
                        Real-world tickets and requirements waiting for your expertise. Solve these to prove you're job-ready.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
                    {SCENARIOS.map(scenario => {
                        const isResolved = resolvedScenarios.has(scenario.id);
                        return (
                            <button
                                key={scenario.id}
                                onClick={() => setActiveScenarioId(scenario.id)}
                                className={`group relative p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isResolved
                                    ? 'bg-surface/50 dark:bg-dark-surface/50 border-success/30'
                                    : 'bg-surface dark:bg-dark-surface border-border-color dark:border-dark-border-color hover:border-primary/50'
                                    }`}
                            >
                                <div className="absolute top-4 right-4">
                                    {isResolved ? (
                                        <CheckCircleIcon className="w-6 h-6 text-success" />
                                    ) : (
                                        <div className={`px-2 py-1 rounded text-xs font-bold ${scenario.difficulty === 'Senior' ? 'bg-error/10 text-error' :
                                            scenario.difficulty === 'Mid' ? 'bg-warning/10 text-warning' :
                                                scenario.difficulty === 'Expert' ? 'bg-purple-500/10 text-purple-500' :
                                                    'bg-success/10 text-success'
                                            }`}>
                                            {scenario.difficulty}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 rounded-lg bg-surface-light dark:bg-dark-surface-light border border-white/5">
                                        {getTypeIcon(scenario.type)}
                                    </div>
                                    <span className="text-xs font-bold text-text-secondary tracking-wider uppercase">{scenario.module}</span>
                                </div>

                                <h3 className="font-bold text-lg text-text-primary dark:text-dark-text-primary mb-2 group-hover:text-primary transition-colors pr-8">
                                    {scenario.title}
                                </h3>
                                <p className="text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2">
                                    {scenario.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto pb-12 px-4 sm:px-0">
            <button
                onClick={() => setActiveScenarioId(null)}
                className="mb-8 flex items-center text-sm font-bold text-text-secondary hover:text-primary transition-colors"
            >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                Back to Inbox
            </button>

            <div className="glass-card rounded-3xl shadow-glow-sm overflow-hidden">
                {/* Scenario Header */}
                <div className="p-5 sm:p-8 border-b border-border-color dark:border-dark-border-color bg-surface-light/30">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeScenario.type === 'BUG_FIX' ? 'bg-error/10 text-error border-error/20' :
                                activeScenario.type === 'REQUIREMENT' ? 'bg-warning/10 text-warning border-warning/20' :
                                    activeScenario.type === 'OUTAGE' ? 'bg-error/10 text-error border-error/20' :
                                        'bg-info/10 text-info border-info/20'
                                }`}>
                                {activeScenario.type.replace('_', ' ')}
                            </span>
                            <span className="text-xs font-bold text-text-secondary">{activeScenario.module} • {activeScenario.difficulty} Consultant Level</span>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-text-primary dark:text-dark-text-primary mb-6">{activeScenario.title}</h1>
                    <div className="bg-surface dark:bg-dark-surface p-4 sm:p-6 rounded-xl border border-border-color dark:border-dark-border-color italic text-lg text-text-primary dark:text-dark-text-primary leading-relaxed font-serif">
                        "{activeScenario.description}"
                    </div>
                </div>

                {/* Options */}
                <div className="p-5 sm:p-8 space-y-4">
                    <h2 className="font-bold text-text-secondary uppercase tracking-wider text-sm mb-4">Select your recommendation:</h2>
                    {activeScenario.options.map((option) => {
                        const isSelected = currentState.selectedOption === option.id;
                        const showResult = currentState.isSubmitted && isSelected;
                        const isCorrect = option.isCorrect;

                        let borderClass = 'border-border-color dark:border-dark-border-color hover:border-primary/50';
                        if (isSelected && !currentState.isSubmitted) borderClass = 'border-primary bg-primary/5';
                        if (showResult && isCorrect) borderClass = 'border-success bg-success/10';
                        if (showResult && !isCorrect) borderClass = 'border-error bg-error/10';

                        return (
                            <div key={option.id} className="space-y-3">
                                <button
                                    onClick={() => handleSelectOption(option.id)}
                                    // Don't disable if submitted, just prevent changes in handler logic if you prefer, 
                                    // but UI-wise disabling might be clearer. user requested feedback visibility.
                                    disabled={currentState.isSubmitted}
                                    className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 ${borderClass}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-current' : 'border-text-secondary'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-text-primary dark:text-dark-text-primary' : 'text-text-secondary'}`}>
                                            {option.text}
                                        </span>
                                    </div>
                                </button>

                                {/* Feedback Section - Show only if submitted and selected */}
                                {currentState.isSubmitted && isSelected && (
                                    <div className={`ml-0 sm:ml-9 p-4 rounded-xl text-sm leading-relaxed animate-fade-in ${isCorrect ? 'bg-success/5 text-success-dark dark:text-success' : 'bg-error/5 text-error-dark dark:text-error'}`}>
                                        <div className="flex items-start gap-2">
                                            {isCorrect ? <CheckCircleIcon className="w-5 h-5 flex-shrink-0" /> : <XCircleIcon className="w-5 h-5 flex-shrink-0" />}
                                            <div>
                                                <p className="font-bold mb-1">{isCorrect ? 'Excellent choice!' : 'Not quite right.'}</p>
                                                <p>{option.feedback}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Submit / Next / Retry Actions */}
                <div className="px-5 sm:px-8 pb-8 flex flex-col sm:flex-row justify-end gap-3">
                    {!currentState.isSubmitted && (
                        <button
                            onClick={handleSubmit}
                            disabled={!currentState.selectedOption}
                            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-glow-sm hover:shadow-glow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Submit Recommendation
                        </button>
                    )}

                    {currentState.isSubmitted && currentState.selectedOption && activeScenario.options.find(o => o.id === currentState.selectedOption)?.isCorrect && (
                        <button
                            onClick={handleNext}
                            className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all hover:-translate-y-0.5"
                        >
                            Back to Inbox
                        </button>
                    )}

                    {currentState.isSubmitted && currentState.selectedOption && !activeScenario.options.find(o => o.id === currentState.selectedOption)?.isCorrect && (
                        <button
                            onClick={handleRetry}
                            className="w-full sm:w-auto px-6 py-3 font-bold text-text-secondary hover:text-primary transition-colors text-center"
                        >
                            Try Again
                        </button>
                    )}
                </div>

                {/* Senior's Note (Explanation) - Only if correct */}
                {currentState.isSubmitted && currentState.selectedOption && activeScenario.options.find(o => o.id === currentState.selectedOption)?.isCorrect && (
                    <div className="px-5 sm:px-8 pb-8 animate-fade-in-up">
                        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10">
                            <h3 className="flex items-center gap-2 font-bold text-accent dark:text-dark-accent mb-3">
                                <DocumentTextIcon className="w-5 h-5" />
                                Senior Consultant's Note
                            </h3>
                            <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                                {activeScenario.explanation}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScenarioMode;
