import React, { useState, useEffect, useMemo } from 'react';
import { MODULES } from '../constants/modules';
import { AcademicCapIcon, CheckCircleIcon, XCircleIcon } from './Icons';

// Helper to get all questions
const getAllQuestions = () => {
    const questions: any[] = [];
    MODULES.forEach(module => {
        module.chapters.forEach(chapter => {
            if (chapter.quiz) {
                chapter.quiz.questions.forEach(q => {
                    questions.push({
                        ...q,
                        module: module.title,
                        chapter: chapter.title
                    });
                });
            }
        });
    });
    return questions;
};

const CertificationSimulator: React.FC = () => {
    const [status, setStatus] = useState<'intro' | 'active' | 'review'>('intro');
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());

    // Timer
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (status === 'active' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setStatus('review');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const startExam = () => {
        const allQ = getAllQuestions();
        // select random 40 questions (or less if not enough)
        const selected = allQ.sort(() => Math.random() - 0.5).slice(0, 40);
        setQuestions(selected);
        setAnswers(new Array(selected.length).fill(-1));
        setCurrentQuestionIndex(0);
        setTimeLeft(3600);
        setMarkedForReview(new Set());
        setStatus('active');
    };

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const togglereview = () => {
        const newMarked = new Set(markedForReview);
        if (newMarked.has(currentQuestionIndex)) {
            newMarked.delete(currentQuestionIndex);
        } else {
            newMarked.add(currentQuestionIndex);
        }
        setMarkedForReview(newMarked);
    };

    const submitExam = () => {
        if (window.confirm("Are you sure you want to submit your exam?")) {
            setStatus('review');
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) correct++;
        });
        return Math.round((correct / questions.length) * 100);
    };

    if (status === 'intro') {
        return (
            <div className="animate-fade-in max-w-2xl mx-auto py-12 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow-sm">
                    <AcademicCapIcon className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl font-black text-text-primary dark:text-dark-text-primary mb-6">
                    Certification <span className="gradient-text">Simulator</span>
                </h1>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">
                    Test your knowledge with a simulated SAP certification exam.
                    <br />
                    You will have <strong>60 minutes</strong> to answer <strong>40 questions</strong> selected randomly from all modules.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
                    <div className="p-4 bg-surface dark:bg-dark-surface rounded-xl border border-border-color dark:border-dark-border-color">
                        <h3 className="font-bold text-primary dark:text-dark-primary mb-1">REALISTIC</h3>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Simulates the actual exam environment and pressure.</p>
                    </div>
                    <div className="p-4 bg-surface dark:bg-dark-surface rounded-xl border border-border-color dark:border-dark-border-color">
                        <h3 className="font-bold text-primary dark:text-dark-primary mb-1">COMPREHENSIVE</h3>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Covers all modules: FICO, MM, SD, and ABAP.</p>
                    </div>
                    <div className="p-4 bg-surface dark:bg-dark-surface rounded-xl border border-border-color dark:border-dark-border-color">
                        <h3 className="font-bold text-primary dark:text-dark-primary mb-1">DETAILED RESULTS</h3>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">Get instant feedback and review your weak areas.</p>
                    </div>
                </div>

                <button
                    onClick={startExam}
                    className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-md transition-all hover:scale-105 active:scale-95"
                >
                    Start Exam
                </button>
            </div>
        );
    }

    if (status === 'review') {
        const score = calculateScore();
        const passed = score >= 65; // SAP usually requires ~65%

        return (
            <div className="animate-fade-in max-w-4xl mx-auto py-8">
                <div className="text-center mb-10">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-success/10' : 'bg-error/10'}`}>
                        {passed ? <CheckCircleIcon className="w-10 h-10 text-success" /> : <XCircleIcon className="w-10 h-10 text-error" />}
                    </div>
                    <h1 className="text-3xl font-black text-text-primary dark:text-dark-text-primary mb-2">
                        {passed ? 'Congratulations!' : 'Keep Studying!'}
                    </h1>
                    <p className="text-xl text-text-secondary dark:text-dark-text-secondary">
                        You scored <span className={`font-bold ${passed ? 'text-success' : 'text-error'}`}>{score}%</span>
                    </p>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-2">
                        Passing score: 65%
                    </p>
                    <button
                        onClick={() => setStatus('intro')}
                        className="mt-6 px-6 py-2 bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color rounded-lg font-semibold hover:bg-surface-light dark:hover:bg-dark-surface-light transition-colors"
                    >
                        Return to Start
                    </button>
                </div>

                <div className="space-y-6">
                    {questions.map((q, i) => (
                        <div key={i} className={`p-6 rounded-2xl border ${answers[i] === q.correctAnswer
                                ? 'bg-success/5 border-success/20'
                                : 'bg-error/5 border-error/20'
                            }`}>
                            <div className="flex items-start gap-4">
                                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${answers[i] === q.correctAnswer ? 'bg-success text-white' : 'bg-error text-white'
                                    }`}>
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="font-semibold text-text-primary dark:text-dark-text-primary mb-3">
                                        {q.question}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                        {q.options.map((opt: string, optIdx: number) => (
                                            <div key={optIdx} className={`p-3 rounded-lg text-sm border ${optIdx === q.correctAnswer
                                                    ? 'bg-success/10 border-success text-success font-bold'
                                                    : optIdx === answers[i]
                                                        ? 'bg-error/10 border-error text-error'
                                                        : 'bg-surface dark:bg-dark-surface border-transparent opacity-60'
                                                }`}>
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-text-secondary dark:text-dark-text-secondary bg-surface/50 dark:bg-dark-surface/50 p-2 rounded-lg">
                                        <span className="font-bold">Explanation:</span> {q.explanation || "Review the module materials for more details."}
                                    </div>
                                    <div className="mt-2 text-[10px] uppercase tracking-wider font-bold text-text-secondary/50">
                                        {q.module} &gt; {q.chapter}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Active Exam Status
    const currentQ = questions[currentQuestionIndex];

    return (
        <div className="animate-fade-in max-w-4xl mx-auto py-6 min-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-20 bg-background/80 dark:bg-dark-background/80 backdrop-blur-md z-20 py-4 border-b border-border-color/50">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">Question</span>
                    <div className="text-2xl font-black text-text-primary dark:text-dark-text-primary">
                        {currentQuestionIndex + 1} <span className="text-lg text-text-secondary dark:text-dark-text-secondary font-normal">/ {questions.length}</span>
                    </div>
                </div>

                <div className={`text-xl font-mono font-bold px-4 py-2 rounded-lg ${timeLeft < 300 ? 'text-error bg-error/10 animate-pulse' : 'text-primary dark:text-dark-primary bg-primary/10'}`}>
                    {formatTime(timeLeft)}
                </div>

                <button
                    onClick={submitExam}
                    className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-focus transition-colors"
                >
                    Submit
                </button>
            </div>

            {/* Question Card */}
            <div className="flex-1">
                <div className="bg-surface dark:bg-dark-surface p-6 sm:p-10 rounded-3xl border border-border-color dark:border-dark-border-color shadow-card dark:shadow-dark-card mb-8">
                    <div className="flex justify-between mb-6">
                        <span className="px-3 py-1 bg-surface-light dark:bg-dark-surface-light rounded-full text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">
                            {currentQ.module}
                        </span>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={markedForReview.has(currentQuestionIndex)}
                                onChange={togglereview}
                                className="w-4 h-4 rounded border-border-color text-warning focus:ring-warning"
                            />
                            <span className={`text-sm font-medium ${markedForReview.has(currentQuestionIndex) ? 'text-warning' : 'text-text-secondary'}`}>Mark for Review</span>
                        </label>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-8 leading-snug">
                        {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQ.options.map((option: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group ${answers[currentQuestionIndex] === idx
                                        ? 'border-primary bg-primary/5 shadow-inner'
                                        : 'border-border-color dark:border-dark-border-color hover:border-primary/50 hover:bg-surface-light dark:hover:bg-dark-surface-light'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${answers[currentQuestionIndex] === idx
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-text-secondary/30 group-hover:border-primary/50'
                                    }`}>
                                    {answers[currentQuestionIndex] === idx && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <span className={`text-base ${answers[currentQuestionIndex] === idx ? 'font-semibold text-primary dark:text-dark-primary' : 'text-text-primary dark:text-dark-text-primary'}`}>
                                    {option}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center py-6">
                <button
                    onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 rounded-xl font-bold text-text-secondary dark:text-dark-text-secondary hover:bg-surface dark:hover:bg-dark-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>

                {/* Progress Dots (Hidden on small screens) */}
                <div className="hidden md:flex gap-1">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentQuestionIndex(i)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === currentQuestionIndex ? 'bg-primary scale-125' :
                                    markedForReview.has(i) ? 'bg-warning' :
                                        answers[i] !== -1 ? 'bg-primary/40' : 'bg-border-color'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setCurrentQuestionIndex(p => Math.min(questions.length - 1, p + 1))}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-glow-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CertificationSimulator;
