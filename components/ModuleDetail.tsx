import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { MODULES } from '../constants/modules';
import type { Module, Chapter, Lesson, Quiz } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { useQuiz } from '../contexts/QuizContext';
import { DocumentTextIcon, QuestionMarkCircleIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon, StarIcon } from './Icons';

// Breadcrumb component
const Breadcrumb: React.FC<{ module: Module; chapter?: Chapter; lesson?: Lesson; isQuiz?: boolean }> = ({ module, chapter, lesson, isQuiz }) => {
    return (
        <nav className="flex items-center space-x-1.5 text-sm mb-6 overflow-x-auto pb-1" aria-label="Breadcrumb">
            <Link to="/" className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            </Link>
            <svg className="w-3.5 h-3.5 text-text-secondary/40 dark:text-dark-text-secondary/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            <Link to={`/modules/${module.id}`} className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors font-medium truncate max-w-[120px] flex-shrink-0">{module.title}</Link>
            {chapter && (
                <>
                    <svg className="w-3.5 h-3.5 text-text-secondary/40 dark:text-dark-text-secondary/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <span className="text-text-secondary dark:text-dark-text-secondary truncate max-w-[150px] flex-shrink-0">{chapter.title}</span>
                </>
            )}
            {lesson && (
                <>
                    <svg className="w-3.5 h-3.5 text-text-secondary/40 dark:text-dark-text-secondary/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <span className="text-primary dark:text-dark-primary font-semibold truncate max-w-[180px]">{lesson.title}</span>
                </>
            )}
            {isQuiz && (
                <>
                    <svg className="w-3.5 h-3.5 text-text-secondary/40 dark:text-dark-text-secondary/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <span className="text-accent dark:text-dark-accent font-semibold">Quiz</span>
                </>
            )}
        </nav>
    );
};

// Bookmark system
const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
    useEffect(() => {
        try {
            const stored = localStorage.getItem('bookmarkedLessons');
            if (stored) setBookmarks(new Set(JSON.parse(stored)));
        } catch { }
    }, []);
    const toggleBookmark = (lessonId: string) => {
        setBookmarks(prev => {
            const next = new Set(prev);
            if (next.has(lessonId)) next.delete(lessonId);
            else next.add(lessonId);
            localStorage.setItem('bookmarkedLessons', JSON.stringify(Array.from(next)));
            return next;
        });
    };
    return { bookmarks, toggleBookmark };
};

interface LessonContentProps {
    lesson: Lesson;
    isCompleted: boolean;
    onMarkComplete: () => void;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson, isCompleted, onMarkComplete, isBookmarked, onToggleBookmark }) => {
    const { details } = lesson;

    const renderDetailItem = (label: string, value?: string | string[], icon?: React.ReactNode) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
            <div className="mb-10 p-6 rounded-2xl bg-surface-light/30 dark:bg-dark-surface-light/30 border border-border-color dark:border-dark-border-color">
                <h3 className="flex items-center gap-3 text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-dark-primary/10 text-primary dark:text-dark-primary">
                        {icon}
                    </div>
                    {label}
                </h3>
                <div className="pl-1">
                    {Array.isArray(value) ? (
                        <ul className="space-y-3">
                            {value.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-text-secondary dark:text-dark-text-secondary leading-relaxed group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 dark:bg-dark-primary/60 mt-2.5 flex-shrink-0 group-hover:bg-primary dark:group-hover:bg-dark-primary transition-colors" />
                                    <span className="prose-custom" dangerouslySetInnerHTML={{ __html: item }} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-text-secondary dark:text-dark-text-secondary prose-custom leading-relaxed" dangerouslySetInnerHTML={{ __html: value }} />
                    )}
                </div>
            </div>
        );
    };

    return (
        <article className="animate-fade-in">
            <header className="mb-8 border-b border-border-color dark:border-dark-border-color pb-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl sm:text-4xl font-black text-text-primary dark:text-dark-text-primary tracking-tight leading-tight mb-4">{lesson.title}</h1>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-light dark:bg-dark-surface-light text-xs font-medium text-text-secondary dark:text-dark-text-secondary border border-border-color dark:border-dark-border-color">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                {lesson.duration} min
                            </span>
                            {details.tCode && details.tCode !== 'N/A' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 dark:bg-dark-accent/10 text-xs font-mono font-bold text-accent dark:text-dark-accent border border-accent/20">
                                    {details.tCode}
                                </span>
                            )}
                            {isCompleted && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 dark:bg-dark-success/10 text-xs font-bold text-success dark:text-dark-success border border-success/20 animate-pulse-once">
                                    <CheckCircleIcon className="w-3.5 h-3.5" />
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onToggleBookmark}
                        className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 ${isBookmarked
                            ? 'text-warning bg-warning/10 border border-warning/20 shadow-glow-sm'
                            : 'text-text-secondary dark:text-dark-text-secondary hover:text-warning hover:bg-warning/10'
                            }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
                    >
                        <StarIcon className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Lesson content sections */}
            <div className="space-y-6">
                {renderDetailItem('Definition', details.definition,
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                )}
                {renderDetailItem('Purpose', details.purpose,
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>
                )}
                {details.sproPath && details.sproPath !== 'N/A' && renderDetailItem('SPRO Path', `<em class="text-accent dark:text-dark-accent font-medium">${details.sproPath}</em>`,
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" /></svg>
                )}
                {renderDetailItem('Configuration Steps', details.configurationSteps,
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                )}
                {renderDetailItem('Integration Notes', details.integrationNotes,
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>
                )}
                {renderDetailItem('S/4HANA Updates', details.updatesS4HANA,
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" /></svg>
                )}
            </div>

            {/* Footer Actions */}
            <footer className="mt-12 pt-8 border-t border-border-color dark:border-dark-border-color sticky bottom-0 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl p-4 -mx-4 sm:mx-0 sm:rounded-2xl z-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary flex items-center gap-1.5 order-2 sm:order-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        Tip: Left/Right keys usually navigate
                    </span>
                    {isCompleted ? (
                        <div className="order-1 sm:order-2 inline-flex items-center px-6 py-3 text-sm font-bold text-success dark:text-dark-success bg-success/10 dark:bg-dark-success/10 rounded-xl border border-success/20">
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            Lesson Completed
                        </div>
                    ) : (
                        <button
                            onClick={onMarkComplete}
                            className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                            Mark Complete
                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                        </button>
                    )}
                </div>
            </footer>
        </article>
    );
};

const QuizContent: React.FC<{ quiz: Quiz; module: Module; chapter: Chapter; }> = ({ quiz, module, chapter }) => {
    const navigate = useNavigate();
    const quizId = quiz.id;
    const { getQuizState, updateQuizAnswer, submitQuiz, resetQuiz } = useQuiz();
    const { answers, submitted, score } = getQuizState(quizId);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

    const handleOptionChange = (questionIndex: number, optionIndex: number) => {
        if (submitted) return;
        updateQuizAnswer(quizId, questionIndex, optionIndex);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correctAnswers++;
            }
        });
        const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);

        if (finalScore >= 70) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        submitQuiz(quizId, correctAnswers);
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        resetQuiz(quizId);
        setCurrentQuestionIdx(0);
    };

    const findNextLessonOrQuiz = () => {
        const chapterIndex = module.chapters.findIndex(c => c.id === chapter.id);
        if (chapterIndex < module.chapters.length - 1) {
            const nextChapter = module.chapters[chapterIndex + 1];
            if (nextChapter.lessons.length > 0) {
                return `/modules/${module.id}/chapters/${nextChapter.id}/lessons/${nextChapter.lessons[0].id}`;
            } else if (nextChapter.quiz) {
                return `/modules/${module.id}/chapters/${nextChapter.id}/quiz`;
            }
        }
        return null;
    };

    const handleNext = () => {
        const nextLink = findNextLessonOrQuiz();
        if (nextLink) {
            navigate(nextLink);
        } else {
            navigate('/');
        }
    }

    const totalQuestions = quiz.questions.length;
    const scorePercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const currentQuestion = quiz.questions[currentQuestionIdx];

    return (
        <div className="animate-fade-in">
            <header className="mb-8 text-center">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-accent/10 dark:bg-dark-accent/10 text-accent dark:text-dark-accent mb-4 border border-accent/20">
                    <StarIcon className="w-3.5 h-3.5 mr-1" />
                    Knowledge Check
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-primary dark:text-dark-primary tracking-tight mb-2">{quiz.title}</h1>
                <p className="text-text-secondary dark:text-dark-text-secondary max-w-lg mx-auto">
                    Test your understanding of <span className="font-semibold text-text-primary dark:text-dark-text-primary">{chapter.title}</span>.
                </p>
            </header>

            {submitted ? (
                <div className="max-w-2xl mx-auto bg-surface dark:bg-dark-surface rounded-3xl border border-border-color dark:border-dark-border-color shadow-card dark:shadow-dark-card overflow-hidden">
                    <div className="p-8 text-center bg-gradient-to-b from-surface-light/50 to-transparent dark:from-dark-surface-light/50">
                        <div className="relative inline-flex items-center justify-center h-48 w-48 mb-6">
                            <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 36 36">
                                <path className="text-border-color dark:text-dark-border-color" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path
                                    className={`${scorePercentage >= 70 ? 'text-success' : scorePercentage >= 40 ? 'text-warning' : 'text-error'} transition-all duration-1000 ease-out`}
                                    strokeDasharray={`${scorePercentage}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-text-primary dark:text-dark-text-primary">{Math.round(scorePercentage)}%</span>
                                <span className="text-sm font-bold text-text-secondary uppercase tracking-wider mt-1">{score}/{totalQuestions} Correct</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                            {scorePercentage >= 70 ? 'Outstanding! 🎉' : scorePercentage >= 40 ? 'Good Effort! 👍' : 'Keep Studying! 📚'}
                        </h2>
                        <p className="text-text-secondary dark:text-dark-text-secondary mb-8">
                            {scorePercentage >= 70 ? "You've mastered this chapter." : "Review the lessons and try again to improve your score."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={handleRestart} className="px-6 py-3 font-bold text-text-secondary hover:text-primary border border-border-color rounded-xl hover:bg-surface-light transition-colors">
                                Retry Quiz
                            </button>
                            <button onClick={handleNext} className="px-6 py-3 font-bold text-white bg-primary hover:bg-primary-focus rounded-xl shadow-glow-sm transition-all hover:-translate-y-0.5">
                                {findNextLessonOrQuiz() ? 'Next Chapter' : 'Finish Module'}
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-border-color p-8 bg-surface-light/30">
                        <h3 className="font-bold text-lg mb-4">Detailed Review</h3>
                        <div className="space-y-4">
                            {quiz.questions.map((q, qIndex) => {
                                const isCorrect = answers[qIndex] === q.correctAnswer;
                                return (
                                    <div key={qIndex} className={`p-4 rounded-xl border ${isCorrect ? 'border-success/20 bg-success/5' : 'border-error/20 bg-error/5'}`}>
                                        <div className="flex gap-3">
                                            <div className={`mt-0.5 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center ${isCorrect ? 'bg-success text-white' : 'bg-error text-white'}`}>
                                                {isCorrect ? <CheckCircleIcon className="w-4 h-4" /> : <XCircleIcon className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-2">{q.question}</p>
                                                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                                                    Correct Answer: <span className="font-bold text-text-primary dark:text-dark-text-primary">{q.options[q.correctAnswer]}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto">
                    {/* Progress steps */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        {quiz.questions.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => answers[idx] !== undefined && setCurrentQuestionIdx(idx)}
                                className={`h-2 flex-1 mx-1 rounded-full transition-colors cursor-pointer ${idx === currentQuestionIdx ? 'bg-primary' :
                                    answers[idx] !== undefined ? 'bg-primary/40' : 'bg-border-color'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="bg-surface dark:bg-dark-surface p-6 sm:p-10 rounded-3xl border border-border-color dark:border-dark-border-color shadow-card dark:shadow-dark-card mb-8 min-h-[400px] flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">Question {currentQuestionIdx + 1} of {totalQuestions}</span>
                            <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-8">
                                {currentQuestion.question}
                            </h2>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, oIndex) => {
                                    const isSelected = answers[currentQuestionIdx] === oIndex;
                                    return (
                                        <button
                                            key={oIndex}
                                            onClick={() => handleOptionChange(currentQuestionIdx, oIndex)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center group ${isSelected
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border-color dark:border-dark-border-color hover:border-primary/50'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${isSelected ? 'border-primary' : 'border-text-secondary group-hover:border-primary'
                                                }`}>
                                                {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                            </div>
                                            <span className={`${isSelected ? 'font-bold text-primary dark:text-dark-primary' : 'text-text-primary dark:text-dark-text-primary'}`}>{option}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                            disabled={currentQuestionIdx === 0}
                            className="px-6 py-3 font-bold text-text-secondary disabled:opacity-30 hover:text-primary transition-colors"
                        >
                            Previous
                        </button>

                        {currentQuestionIdx === totalQuestions - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={!quiz.questions.every((_, i) => answers[i] !== undefined)}
                                className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestionIdx(Math.min(totalQuestions - 1, currentQuestionIdx + 1))}
                                className="px-8 py-3 bg-surface dark:bg-dark-surface border border-border-color text-text-primary font-bold rounded-xl hover:bg-surface-light transition-all"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// ... ModuleDetail main component ...
const ModuleDetail: React.FC = () => {
    // ... params and state ...
    const { moduleId, chapterId, lessonId } = useParams<{ moduleId: string; chapterId: string; lessonId: string; }>();
    const navigate = useNavigate();
    const { completedLessons, markAsComplete } = useProgress();
    const { bookmarks, toggleBookmark } = useBookmarks();

    const [activeChapter, setActiveChapter] = useState<string | null>(null);
    // ... (logic remains mostly similar, just updating container classes) ...
    // UPDATED: Added a "road map" style for sidebar

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const module = MODULES.find(m => m.id === moduleId);

    // Sidebar Refs
    useEffect(() => {
        if (moduleId) localStorage.setItem('lastAccessedModuleId', moduleId);
    }, [moduleId]);
    useEffect(() => {
        if (chapterId) setActiveChapter(chapterId);
        else if (module?.chapters.length) setActiveChapter(module.chapters[0].id);
    }, [chapterId, module]);
    const isQuizPath = window.location.hash.includes(`/${chapterId}/quiz`) || window.location.pathname.includes(`/${chapterId}/quiz`);

    // Redirect logic...
    useEffect(() => {
        if (!chapterId && !lessonId && !isQuizPath && module?.chapters.length && module.chapters[0].lessons.length) {
            navigate(`/modules/${moduleId}/chapters/${module.chapters[0].id}/lessons/${module.chapters[0].lessons[0].id}`, { replace: true });
        }
    }, [moduleId, chapterId, lessonId, isQuizPath, module, navigate]);

    useEffect(() => { window.scrollTo(0, 0); }, [chapterId, lessonId, isQuizPath]);

    // Keyboard logic (omitted for brevity, same as before)
    const findNext = useCallback(() => { /* ... */ }, []);

    if (!module) return <div>Module not found</div>;

    const currentChapter = module.chapters.find(c => c.id === chapterId);
    const currentLesson = currentChapter?.lessons.find(l => l.id === lessonId);
    const currentQuiz = (isQuizPath && currentChapter) ? currentChapter.quiz : undefined;

    const toggleChapter = (id: string) => setActiveChapter(activeChapter === id ? null : id);

    return (
        <div className="animate-fade-in pb-12">
            <Breadcrumb module={module} chapter={currentChapter} lesson={currentLesson} isQuiz={!!currentQuiz} />

            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mb-6 w-full flex items-center justify-between px-4 py-3 rounded-xl bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color text-sm font-bold shadow-sm"
            >
                <div className="flex items-center gap-3">
                    <span>{module.title} Content</span>
                </div>
                {sidebarOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Roadmap Sidebar */}
                <aside className={`lg:w-80 flex-shrink-0 sticky top-24 transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-surface/50 dark:bg-dark-surface/50 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/5 shadow-card dark:shadow-dark-card p-6">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-color dark:border-dark-border-color">
                            <h2 className="font-bold text-lg leading-tight">{module.title}</h2>
                        </div>

                        <div className="space-y-4">
                            {module.chapters.map((chapter, idx) => {
                                const isActive = activeChapter === chapter.id;
                                const total = chapter.lessons.length;
                                const completed = chapter.lessons.filter(l => completedLessons.has(l.id)).length;
                                const isChapterComp = completed === total && total > 0;

                                return (
                                    <div key={chapter.id} className="relative">
                                        {/* Connecting Line (except for last) */}
                                        {idx !== module.chapters.length - 1 && (
                                            <div className="absolute left-[15px] top-8 bottom-[-16px] w-0.5 bg-border-color dark:bg-dark-border-color z-0" />
                                        )}

                                        <div className="relative z-10">
                                            <button
                                                onClick={() => toggleChapter(chapter.id)}
                                                className="w-full flex items-center gap-3 text-left group"
                                            >
                                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${isChapterComp
                                                    ? 'bg-success border-success text-white'
                                                    : isActive
                                                        ? 'bg-primary border-primary text-white'
                                                        : 'bg-surface border-border-color text-text-secondary'
                                                    }`}>
                                                    {isChapterComp ? <CheckCircleIcon className="w-5 h-5" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                                                </div>
                                                <span className={`font-bold text-sm ${isActive ? 'text-primary dark:text-dark-primary' : 'text-text-secondary'}`}>
                                                    {chapter.title}
                                                </span>
                                            </button>

                                            {isActive && (
                                                <div className="ml-4 pl-4 mt-3 border-l-2 border-primary/20 space-y-1">
                                                    {chapter.lessons.map(lesson => {
                                                        const isLessonActive = lesson.id === lessonId;
                                                        const isLessonComp = completedLessons.has(lesson.id);
                                                        return (
                                                            <Link
                                                                key={lesson.id}
                                                                to={`/modules/${moduleId}/chapters/${chapter.id}/lessons/${lesson.id}`}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={`block px-3 py-2 rounded-lg text-sm transition-all ${isLessonActive
                                                                    ? 'bg-primary/10 text-primary font-bold shadow-sm'
                                                                    : 'text-text-secondary hover:text-primary hover:bg-surface-light'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span>{lesson.title}</span>
                                                                    {isLessonComp && <CheckCircleIcon className="w-3.5 h-3.5 text-success" />}
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                    {chapter.quiz && (
                                                        <Link
                                                            to={`/modules/${moduleId}/chapters/${chapter.id}/quiz`}
                                                            onClick={() => setSidebarOpen(false)}
                                                            className={`block px-3 py-2 rounded-lg text-sm transition-all mt-2 ${isQuizPath && chapter.id === chapterId
                                                                ? 'bg-accent/10 text-accent font-bold shadow-sm'
                                                                : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <StarIcon className="w-3.5 h-3.5" />
                                                                Quiz: {chapter.quiz.title}
                                                            </div>
                                                        </Link>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 min-w-0">
                    <div className="glass-card rounded-3xl p-4 sm:p-10 min-h-[600px] relative overflow-hidden">
                        {/* Decorative Background blobbies */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute top-40 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            {currentLesson && (
                                <LessonContent
                                    lesson={currentLesson}
                                    isCompleted={completedLessons.has(currentLesson.id)}
                                    onMarkComplete={() => {
                                        markAsComplete(currentLesson.id);
                                        const chapterIndex = module.chapters.findIndex(c => c.id === chapterId);
                                        const currentChapter = module.chapters[chapterIndex];
                                        const lessonIndex = currentChapter.lessons.findIndex(l => l.id === lessonId);

                                        // Auto-advance logic
                                        if (lessonIndex < currentChapter.lessons.length - 1) {
                                            navigate(`/modules/${moduleId}/chapters/${chapterId}/lessons/${currentChapter.lessons[lessonIndex + 1].id}`);
                                        } else if (currentChapter.quiz) {
                                            navigate(`/modules/${moduleId}/chapters/${chapterId}/quiz`);
                                        } else if (chapterIndex < module.chapters.length - 1) {
                                            const nextChapter = module.chapters[chapterIndex + 1];
                                            if (nextChapter.lessons.length > 0) {
                                                navigate(`/modules/${moduleId}/chapters/${nextChapter.id}/lessons/${nextChapter.lessons[0].id}`);
                                            }
                                        }
                                    }}
                                    isBookmarked={bookmarks.has(currentLesson.id)}
                                    onToggleBookmark={() => toggleBookmark(currentLesson.id)}
                                />
                            )}
                            {currentQuiz && currentChapter && <QuizContent quiz={currentQuiz} module={module} chapter={currentChapter} />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ModuleDetail;