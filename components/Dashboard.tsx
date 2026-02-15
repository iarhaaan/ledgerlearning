import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import type { Module } from '../types';
import { useProgress } from '../contexts/ProgressContext';

const ModuleCard: React.FC<{ module: Module; completedLessons: Set<string>; index: number }> = ({ module, completedLessons, index }) => {
  const totalLessons = module.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  const completedCount = module.chapters.reduce((acc, chapter) =>
    acc + chapter.lessons.filter(l => completedLessons.has(l.id)).length, 0
  );
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const totalQuizzes = module.chapters.filter(c => c.quiz).length;
  const totalDuration = module.chapters.reduce((acc, ch) => acc + ch.lessons.reduce((a, l) => a + l.duration, 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;

  const firstChapter = module.chapters[0];
  const firstLesson = firstChapter?.lessons[0];
  const startLink = (firstChapter && firstLesson)
    ? `/modules/${module.id}/chapters/${firstChapter.id}/lessons/${firstLesson.id}`
    : `/modules/${module.id}`;

  return (
    <Link
      to={startLink}
      className={`group relative glass-card rounded-3xl overflow-hidden hover:shadow-glow-md dark:hover:shadow-dark-glow-md transition-all duration-500 hover:-translate-y-2 flex flex-col animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Progress indicator strip at top */}
      <div className="h-1.5 bg-surface-light dark:bg-dark-surface-light w-full">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6 sm:p-8 flex-grow relative z-10">
        {/* Module Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-heading text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors truncate mb-3">
            {module.title}
          </h2>
          <p className="text-base text-text-secondary dark:text-dark-text-secondary line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {module.description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-white/10 dark:border-white/5 backdrop-blur-sm">
            <div className="text-lg font-bold text-text-primary dark:text-dark-text-primary">{module.chapters.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary font-semibold opacity-70">Chapters</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-white/10 dark:border-white/5 backdrop-blur-sm">
            <div className="text-lg font-bold text-text-primary dark:text-dark-text-primary">{totalLessons}</div>
            <div className="text-[10px] uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary font-semibold opacity-70">Lessons</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-surface/50 dark:bg-dark-surface/50 border border-white/10 dark:border-white/5 backdrop-blur-sm">
            <div className="text-lg font-bold text-text-primary dark:text-dark-text-primary">{totalQuizzes}</div>
            <div className="text-[10px] uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary font-semibold opacity-70">Quizzes</div>
          </div>
        </div>
      </div>

      {/* Footer with Progress */}
      <div className="px-6 sm:px-8 py-5 border-t border-border-color/30 dark:border-dark-border-color/30 bg-surface/30 dark:bg-dark-surface/30 backdrop-blur-md relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-dark-text-secondary">
            {progress === 0 ? 'Not started' : progress === 100 ? '🎉 Completed!' : `${completedCount}/${totalLessons} completed`}
          </span>
          <span className="text-xs font-black text-primary dark:text-dark-primary">{progress}%</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary flex items-center gap-1.5 font-medium bg-surface/50 dark:bg-dark-surface/50 px-2 py-1 rounded-md">
            <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            {hours > 0 ? `${hours}h ` : ''}{mins}m
          </span>
          <span className="text-sm font-bold text-primary dark:text-dark-primary group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
            {progress > 0 ? 'Continue' : 'Start Learning'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { completedLessons } = useProgress();
  const [isChecking, setIsChecking] = useState(true);

  // Calculate overall stats
  const stats = useMemo(() => {
    const totalLessons = MODULES.reduce((acc, m) => acc + m.chapters.reduce((a, c) => a + c.lessons.length, 0), 0);
    const totalCompleted = MODULES.reduce((acc, m) => acc + m.chapters.reduce((a, c) => a + c.lessons.filter(l => completedLessons.has(l.id)).length, 0), 0);
    const totalQuizzes = MODULES.reduce((acc, m) => acc + m.chapters.filter(c => c.quiz).length, 0);
    const totalChapters = MODULES.reduce((acc, m) => acc + m.chapters.length, 0);
    const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
    return { totalLessons, totalCompleted, totalQuizzes, totalChapters, overallProgress };
  }, [completedLessons]);

  useEffect(() => {
    // Removed auto-redirect to allow users to always see the dashboard
    setIsChecking(false);
  }, [navigate]);

  if (isChecking) {
    return null;
  }

  return (
    <div className="animate-fade-in space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative text-center py-10 sm:py-16">
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/20 rounded-full blur-[60px] sm:blur-[100px] animate-pulse-glow" />
          <div className="absolute w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-accent/20 rounded-full blur-[50px] sm:blur-[80px] translate-x-16 sm:translate-x-32 -translate-y-10 sm:-translate-y-20 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-surface/50 dark:bg-dark-surface/50 text-primary dark:text-dark-primary border border-primary/20 dark:border-dark-primary/20 mb-6 shadow-sm backdrop-blur-sm animate-fade-in-down">
          ✨ {MODULES.length} Specialized Modules Available
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading text-text-primary dark:text-dark-text-primary tracking-tight mb-6 animate-fade-in leading-tight px-4">
          Master SAP with <br className="hidden sm:block" />
          <span className="gradient-text relative inline-block">
            Confidence
            <svg className="absolute w-full h-2 sm:h-3 -bottom-1 left-0 text-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary leading-relaxed animate-fade-in-up stagger-1 px-4">
          A premium, interactive learning experience designed for professionals.
          Dive into FICO, SD, MM, and ABAP with real-world scenarios.
        </p>
      </div>

      {/* Overall Progress Bar */}
      {stats.totalCompleted > 0 && (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl glass-strong shadow-glow-sm animate-fade-in-up stagger-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center shadow-lg text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary font-heading">Your Progress</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary font-medium">
                  You've completed <span className="text-primary dark:text-dark-primary font-bold">{stats.totalCompleted}</span> out of {stats.totalLessons} lessons
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{stats.overallProgress}%</span>
              <span className="text-sm font-semibold text-text-secondary dark:text-dark-text-secondary">Mastery</span>
            </div>
          </div>

          <div className="relative w-full h-4 bg-surface dark:bg-dark-surface rounded-full overflow-hidden shadow-inner-glow">
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-accent transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${stats.overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {MODULES.map((module, index) => (
          <ModuleCard key={module.id} module={module} completedLessons={completedLessons} index={index + 2} />
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold font-heading text-text-primary dark:text-dark-text-primary mb-6 flex items-center gap-2 animate-fade-in stagger-3">
          <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
          Quick Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up stagger-4">
          {[
            { to: "/glossary", icon: "book", title: "SAP Glossary", desc: "Expert definitions" },
            { to: "/tcodes", icon: "code", title: "T-Code Index", desc: "Quick cheat sheet" },
            { to: "/spro", icon: "cog", title: "SPRO Explorer", desc: "Config paths" },
            { to: "/flashcards", icon: "card", title: "Flashcards", desc: "Test your memory" },
            { to: "/scenarios", icon: "wrench", title: "Scenarios", desc: "Consultancy Simulator" },
            { to: "/certification", icon: "academic", title: "Cert Simulator", desc: "Mock Exam Mode" },
            { to: "/cheatsheets", icon: "document", title: "Cheatsheets", desc: "Printable Summaries" },
          ].map((link, i) => (
            <Link key={link.to} to={link.to} className="group p-5 rounded-2xl bg-surface/80 dark:bg-dark-surface/80 border border-white/10 dark:border-white/5 hover:border-primary/30 dark:hover:border-dark-primary/30 shadow-sm hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${i % 2 === 0 ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' :
                  'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white'
                  }`}>
                  {link.icon === 'book' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>}
                  {link.icon === 'code' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>}
                  {link.icon === 'cog' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.192-.14 1.742Z" /></svg>}
                  {link.icon === 'card' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" /></svg>}
                  {link.icon === 'wrench' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.192-.14 1.742Z" /></svg>}
                  {link.icon === 'academic' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l15.482 0m-15.482 0a2.25 2.25 0 01-1.883-2.264l.842-5.611a2.25 2.25 0 012.264-1.883H12l3.375 0a2.25 2.25 0 012.264 1.883l.842 5.611a2.25 2.25 0 01-1.883 2.264m-17.764 0h17.764" /></svg>}
                  {link.icon === 'document' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary dark:text-dark-text-primary text-sm transition-colors">{link.title}</h3>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;