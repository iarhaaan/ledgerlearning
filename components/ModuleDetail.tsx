import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import type { Module, Chapter, Lesson, Quiz } from '../types';
import { useProgress } from '../contexts/ProgressContext';
import { useQuiz } from '../contexts/QuizContext';
import { DocumentTextIcon, QuestionMarkCircleIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon } from './Icons';

interface LessonContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson, isCompleted, onMarkComplete }) => {
    const { details } = lesson;

    const renderDetailItem = (label: string, value?: string | string[]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2 border-b border-border-color dark:border-dark-border-color pb-1">{label}</h3>
                {Array.isArray(value) ? (
                    <ul className="list-disc list-inside space-y-1 text-text-secondary dark:text-dark-text-secondary">
                        {value.map((item, index) => <li key={index} dangerouslySetInnerHTML={{ __html: item }} />)}
                    </ul>
                ) : (
                    <div className="text-text-secondary dark:text-dark-text-secondary prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
                )}
            </div>
        );
    };

    return (
        <article>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary dark:text-dark-primary tracking-tight">{lesson.title}</h1>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Estimated duration: {lesson.duration} minutes</p>
            </header>
            <div>
                {renderDetailItem('Definition', details.definition)}
                {renderDetailItem('Purpose', details.purpose)}
                {details.tCode && details.tCode !== 'N/A' && renderDetailItem('T-Code', `<code>${details.tCode}</code>`)}
                {details.sproPath && details.sproPath !== 'N/A' && renderDetailItem('SPRO Path', `<em>${details.sproPath}</em>`)}
                {renderDetailItem('Configuration Steps', details.configurationSteps)}
                {renderDetailItem('Integration Notes', details.integrationNotes)}
                {renderDetailItem('S/4HANA Updates', details.updatesS4HANA)}
            </div>
            <footer className="mt-12 text-right">
                {isCompleted ? (
                    <button
                        disabled
                        className="inline-flex items-center px-6 py-3 text-base font-semibold text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-500/20 rounded-lg cursor-not-allowed"
                    >
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Completed
                    </button>
                ) : (
                    <button
                        onClick={onMarkComplete}
                        className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary-focus dark:bg-dark-primary dark:hover:bg-dark-primary-focus transition-all duration-300 transform hover:scale-105"
                    >
                        Mark as Complete
                        <span className="ml-2">→</span>
                    </button>
                )}
            </footer>
        </article>
    );
};

const QuizContent: React.FC<{ quiz: Quiz; module: Module; chapter: Chapter; }> = ({ quiz, module, chapter }) => {
    const navigate = useNavigate();
    const quizId = quiz.id;
    const { getQuizState, updateQuizAnswer, submitQuiz, resetQuiz } = useQuiz();
    const { answers, submitted, score } = getQuizState(quizId);

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
        submitQuiz(quizId, correctAnswers);
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        resetQuiz(quizId);
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

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary dark:text-dark-primary tracking-tight mb-2">{quiz.title}</h1>
                <p className="text-text-secondary dark:text-dark-text-secondary">Test your knowledge for "{chapter.title}"</p>
            </header>

            {submitted ? (
                <div className="space-y-8">
                    <div className="text-center p-8 bg-surface-light dark:bg-dark-surface-light rounded-2xl shadow-inner">
                        <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-4">Quiz Complete!</h2>
                        <div className="relative inline-flex items-center justify-center h-40 w-40 mb-4">
                            <svg className="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-border-color dark:text-dark-border-color" strokeWidth="2"></circle>
                                <g className="origin-center transform -rotate-90">
                                <circle cx="18" cy="18" r="16" fill="none"
                                    className="stroke-current text-primary dark:text-dark-primary transition-all duration-500"
                                    strokeWidth="2"
                                    strokeDasharray={100.5}
                                    strokeDashoffset={100.5 - (scorePercentage * 100.5 / 100)}>
                                </circle>
                                </g>
                            </svg>
                            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <span className="text-center text-3xl font-bold text-text-primary dark:text-dark-text-primary">{score}
                                <span className="text-lg text-text-secondary dark:text-dark-text-secondary">/{totalQuestions}</span>
                                </span>
                            </div>
                        </div>
                        <p className="text-lg mt-2 text-text-secondary dark:text-dark-text-secondary">Your Score: <span className="font-bold text-primary dark:text-dark-primary">{scorePercentage.toFixed(0)}%</span></p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={handleRestart} className="px-6 py-2 font-semibold text-primary dark:text-dark-primary border border-primary dark:border-dark-primary rounded-lg hover:bg-primary/10 dark:hover:bg-dark-primary/10 transition-colors">
                                Try Again
                            </button>
                            <button onClick={handleNext} className="px-6 py-2 font-semibold text-white bg-primary rounded-lg hover:bg-primary-focus dark:bg-dark-primary dark:hover:bg-dark-primary-focus transition-colors">
                                {findNextLessonOrQuiz() ? 'Next Chapter' : 'Back to Dashboard'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-text-primary dark:text-dark-text-primary">Review Your Answers</h3>
                        <div className="space-y-4">
                        {quiz.questions.map((q, qIndex) => {
                            const isCorrect = answers[qIndex] === q.correctAnswer;
                            const userAnswer = answers[qIndex] !== undefined ? q.options[answers[qIndex]] : "Not Answered";
                            const correctAnswerText = q.options[q.correctAnswer];

                            return (
                                <div key={qIndex} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-500/10' : 'border-red-500 bg-red-50 dark:bg-red-500/10'}`}>
                                    <p className="font-semibold text-text-primary dark:text-dark-text-primary">{qIndex + 1}. {q.question}</p>
                                    <p className={`mt-2 flex items-center ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                        {isCorrect ? <CheckCircleIcon className="inline h-5 w-5 mr-2 flex-shrink-0" /> : <XCircleIcon className="inline h-5 w-5 mr-2 flex-shrink-0" />}
                                        Your answer: <span className="font-medium ml-1">{userAnswer}</span>
                                    </p>
                                    {!isCorrect && (
                                        <p className="mt-1 flex items-center text-green-700 dark:text-green-400">
                                           <CheckCircleIcon className="inline h-5 w-5 mr-2 flex-shrink-0 text-green-500"/>
                                           Correct answer: <span className="font-medium ml-1">{correctAnswerText}</span>
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="space-y-8">
                    {quiz.questions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-surface-light/50 dark:bg-dark-surface-light/50 p-4 sm:p-6 rounded-lg border border-border-color dark:border-dark-border-color">
                            <p className="font-semibold text-text-primary dark:text-dark-text-primary mb-4 leading-relaxed">{qIndex + 1}. {q.question}</p>
                            <div className="space-y-3">
                                {q.options.map((option, oIndex) => {
                                    const isSelected = answers[qIndex] === oIndex;
                                    return (
                                    <label key={oIndex} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? 'border-primary dark:border-dark-primary bg-primary/10 dark:bg-dark-primary/10 shadow-sm' : 'border-border-color dark:border-dark-border-color bg-surface dark:bg-dark-surface hover:border-primary/50 dark:hover:border-dark-primary/50'}`}>
                                        <input
                                            type="radio"
                                            name={`question-${qIndex}`}
                                            value={oIndex}
                                            checked={isSelected}
                                            onChange={() => handleOptionChange(qIndex, oIndex)}
                                            className="h-4 w-4 text-primary dark:text-dark-primary focus:ring-primary dark:focus:ring-dark-primary border-text-secondary dark:border-dark-text-secondary bg-background dark:bg-dark-background"
                                        />
                                        <span className={`ml-3 ${isSelected ? 'font-semibold text-primary dark:text-dark-primary' : 'text-text-secondary dark:text-dark-text-secondary'}`}>{option}</span>
                                    </label>
                                )})}
                            </div>
                        </div>
                    ))}
                    </div>
                     <footer className="mt-8">
                        <button type="submit" className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary-focus dark:bg-dark-primary dark:hover:bg-dark-primary-focus transition-all duration-300 transform hover:scale-105">
                            Submit Answers
                        </button>
                    </footer>
                </form>
            )}
        </div>
    );
};

const ModuleDetail: React.FC = () => {
    const { moduleId, chapterId, lessonId } = useParams<{ moduleId: string; chapterId: string; lessonId: string; }>();
    const navigate = useNavigate();
    const { completedLessons, markAsComplete } = useProgress();
    
    const [activeChapter, setActiveChapter] = useState<string | null>(null);

    const module = MODULES.find(m => m.id === moduleId);

    useEffect(() => {
        if (moduleId) {
            localStorage.setItem('lastAccessedModuleId', moduleId);
        }
    }, [moduleId]);
    
    useEffect(() => {
        if (chapterId) {
            setActiveChapter(chapterId);
        } else if (module?.chapters.length) {
            setActiveChapter(module.chapters[0].id);
        }
    }, [chapterId, module]);

    const isQuizPath = window.location.hash.includes(`/${chapterId}/quiz`);

    useEffect(() => {
        // Redirect to first lesson if no specific content is selected
        if (!chapterId && !lessonId && !isQuizPath && module?.chapters.length && module.chapters[0].lessons.length) {
            navigate(`/modules/${moduleId}/chapters/${module.chapters[0].id}/lessons/${module.chapters[0].lessons[0].id}`, { replace: true });
        }
    }, [moduleId, chapterId, lessonId, isQuizPath, module, navigate]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [chapterId, lessonId, isQuizPath]);


    if (!module) {
        return <div className="text-center py-10 text-xl">Module not found.</div>;
    }

    const currentChapter = module.chapters.find(c => c.id === chapterId);
    const currentLesson = currentChapter?.lessons.find(l => l.id === lessonId);
    const currentQuiz = (isQuizPath && currentChapter) ? currentChapter.quiz : undefined;

    const toggleChapter = (id: string) => {
        setActiveChapter(activeChapter === id ? null : id);
    };
    
    const findNextItemUrl = (currentChapter: Chapter, currentLessonId: string): string => {
        const lessonIndex = currentChapter.lessons.findIndex(l => l.id === currentLessonId);
        
        // Next lesson in the same chapter
        if (lessonIndex > -1 && lessonIndex < currentChapter.lessons.length - 1) {
            return `/modules/${moduleId}/chapters/${currentChapter.id}/lessons/${currentChapter.lessons[lessonIndex + 1].id}`;
        }

        // Quiz in the same chapter
        if (currentChapter.quiz) {
            return `/modules/${moduleId}/chapters/${currentChapter.id}/quiz`;
        }

        // First lesson or quiz of the next chapter
        const chapterIndex = module.chapters.findIndex(c => c.id === currentChapter.id);
        if (chapterIndex < module.chapters.length - 1) {
            const nextChapter = module.chapters[chapterIndex + 1];
            if (nextChapter.lessons.length > 0) {
                return `/modules/${moduleId}/chapters/${nextChapter.id}/lessons/${nextChapter.lessons[0].id}`;
            }
            if (nextChapter.quiz) {
                return `/modules/${moduleId}/chapters/${nextChapter.id}/quiz`;
            }
        }
        
        // End of module, go to dashboard
        return '/';
    };

    const handleMarkComplete = () => {
        if (currentChapter && currentLesson) {
            markAsComplete(currentLesson.id);
            const nextUrl = findNextItemUrl(currentChapter, currentLesson.id);
            navigate(nextUrl);
        }
    };

    const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newModuleId = e.target.value;
        const newModule = MODULES.find(m => m.id === newModuleId);
        if (newModule && newModule.chapters.length > 0 && newModule.chapters[0].lessons.length > 0) {
            const firstChapter = newModule.chapters[0];
            const firstLesson = firstChapter.lessons[0];
            navigate(`/modules/${newModule.id}/chapters/${firstChapter.id}/lessons/${firstLesson.id}`);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24 self-start">
                <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color p-4">
                    <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4 px-2">{module.title}</h2>
                    
                    <div className="mb-4 px-2">
                        <label htmlFor="module-switcher" className="block text-xs font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Change Module</label>
                        <select
                            id="module-switcher"
                            value={moduleId}
                            onChange={handleModuleChange}
                            className="w-full pl-3 pr-10 py-2 text-base bg-background dark:bg-dark-background border border-border-color dark:border-dark-border-color rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent focus:outline-none"
                        >
                            {MODULES.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <nav>
                        <ul>
                            {module.chapters.map(chapter => (
                                <li key={chapter.id} className="mb-1">
                                    <button
                                        onClick={() => toggleChapter(chapter.id)}
                                        className="w-full text-left font-semibold text-text-primary dark:text-dark-text-primary flex justify-between items-center p-2 rounded-md hover:bg-surface-light dark:hover:bg-dark-surface-light transition-colors"
                                    >
                                        <span>{chapter.title}</span>
                                        {activeChapter === chapter.id ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                    </button>
                                    {activeChapter === chapter.id && (
                                        <ul className="pl-4 mt-1 border-l-2 border-primary/50 dark:border-dark-primary/50">
                                            {chapter.lessons.map(lesson => {
                                                const isCompleted = completedLessons.has(lesson.id);
                                                return (
                                                <li key={lesson.id}>
                                                    <Link
                                                        to={`/modules/${moduleId}/chapters/${chapter.id}/lessons/${lesson.id}`}
                                                        className={`flex items-center space-x-3 p-2 my-1 rounded-md text-sm transition-colors ${lesson.id === lessonId && chapter.id === chapterId ? 'bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary font-semibold' : 'text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-dark-primary'}`}
                                                    >
                                                        {isCompleted ? <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-green-500" /> : <DocumentTextIcon className="h-5 w-5 flex-shrink-0" />}
                                                        <span className={isCompleted ? 'line-through text-text-secondary dark:text-dark-text-secondary' : ''}>{lesson.title}</span>
                                                    </Link>
                                                </li>
                                            )})}
                                            {chapter.quiz && (
                                                 <li key={`${chapter.id}-quiz`}>
                                                    <Link
                                                        to={`/modules/${moduleId}/chapters/${chapter.id}/quiz`}
                                                        className={`flex items-center space-x-3 p-2 my-1 rounded-md text-sm transition-colors ${isQuizPath && chapter.id === chapterId ? 'bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary font-semibold' : 'text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-dark-primary'}`}
                                                    >
                                                        <QuestionMarkCircleIcon className="h-5 w-5 flex-shrink-0" />
                                                        <span>{chapter.quiz.title}</span>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            <main className="lg:w-2/3 xl:w-3/4 min-h-[60vh]">
                <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color shadow-lg p-6 sm:p-8">
                    {currentLesson && <LessonContent lesson={currentLesson} isCompleted={completedLessons.has(currentLesson.id)} onMarkComplete={handleMarkComplete} />}
                    {currentQuiz && currentChapter && <QuizContent quiz={currentQuiz} module={module} chapter={currentChapter} />}
                    {!currentLesson && !currentQuiz && <div className="text-center py-10">Select a lesson or quiz to begin.</div>}
                </div>
            </main>
        </div>
    );
};

export default ModuleDetail;