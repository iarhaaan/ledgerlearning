import React from 'react';
import { MODULES } from '../constants/modules';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const totalChapters = MODULES.reduce((acc, m) => acc + m.chapters.length, 0);
  const totalLessons = MODULES.reduce((acc, m) => acc + m.chapters.reduce((a, c) => a + c.lessons.length, 0), 0);
  const totalQuizzes = MODULES.reduce((acc, m) => acc + m.chapters.filter(c => c.quiz).length, 0);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
      ),
      title: 'Expert-Crafted Content',
      desc: 'Comprehensive lessons built by SAP professionals with real-world experience.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      title: 'Interactive Quizzes',
      desc: 'Test your knowledge with chapter-end quizzes and instant scoring.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
      title: 'T-Code & SPRO Reference',
      desc: 'Searchable indices for transaction codes and configuration paths.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      title: 'Progress Tracking',
      desc: 'Track your learning journey with visual progress indicators.',
    },
  ];

  const stats = [
    { value: MODULES.length, label: 'SAP Modules', suffix: '' },
    { value: totalChapters, label: 'Chapters', suffix: '+' },
    { value: totalLessons, label: 'Lessons', suffix: '+' },
    { value: totalQuizzes, label: 'Quizzes', suffix: '+' },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 dark:bg-dark-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-accent/10 dark:bg-dark-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-primary/5 dark:bg-dark-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16">
          {/* Logo & Badge */}
          <div className="text-center opacity-0 animate-fade-in-down">
            <div className="inline-flex items-center space-x-3 mb-8">
              <span className="text-4xl sm:text-5xl font-heading font-extrabold text-text-primary dark:text-dark-text-primary tracking-tight">
                Ledger<span className="text-primary dark:text-dark-primary">Learning</span>
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto opacity-0 animate-fade-in-up stagger-1">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 dark:bg-dark-primary/10 text-primary dark:text-dark-primary border border-primary/20 dark:border-dark-primary/20">
              ✨ Free & Open Source SAP Training
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-text-primary dark:text-dark-text-primary leading-[1.1]">
              Master SAP with{' '}
              <span className="gradient-text">Ledger Learning</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed">
              Your comprehensive, modern gateway to SAP mastery. Dive into expert-crafted courses for{' '}
              <span className="font-semibold text-primary dark:text-dark-primary">FICO</span>,{' '}
              <span className="font-semibold text-primary dark:text-dark-primary">SD</span>,{' '}
              <span className="font-semibold text-primary dark:text-dark-primary">MM</span>, and{' '}
              <span className="font-semibold text-primary dark:text-dark-primary">ABAP</span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-2">
            <button
              onClick={onGetStarted}
              className="group relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-glow-md hover:shadow-glow-lg dark:shadow-dark-glow-md dark:hover:shadow-dark-glow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-dark-primary/30"
            >
              <span className="relative z-10 flex items-center">
                Start Learning
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
              No sign-up required • 100% free
            </span>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto opacity-0 animate-fade-in-up stagger-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-2xl bg-surface/80 dark:bg-dark-surface/80 glass border border-border-color dark:border-dark-border-color"
              >
                <div className="text-3xl sm:text-4xl font-black text-primary dark:text-dark-primary animate-count-up" style={{ animationDelay: `${0.5 + i * 0.15}s` }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm font-medium text-text-secondary dark:text-dark-text-secondary mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="text-center mb-12 opacity-0 animate-fade-in-up stagger-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary">
              Everything you need to succeed
            </h2>
            <p className="mt-3 text-text-secondary dark:text-dark-text-secondary max-w-xl mx-auto">
              A complete learning platform built with modern tools and best practices.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 animate-fade-in-up stagger-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color hover:border-primary/30 dark:hover:border-dark-primary/30 shadow-card dark:shadow-dark-card hover:shadow-card-hover dark:hover:shadow-dark-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-dark-primary/10 flex items-center justify-center text-primary dark:text-dark-primary mb-4 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-dark-primary dark:group-hover:text-dark-background transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-text-primary dark:text-dark-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module Preview */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 opacity-0 animate-fade-in-up stagger-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-dark-text-primary">Available Modules</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULES.map((mod, i) => {
              const lessons = mod.chapters.reduce((a, c) => a + c.lessons.length, 0);
              return (
                <div
                  key={mod.id}
                  className="p-5 rounded-2xl bg-surface dark:bg-dark-surface border border-border-color dark:border-dark-border-color shadow-card dark:shadow-dark-card group hover:border-primary/30 dark:hover:border-dark-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-dark-primary/10 flex items-center justify-center text-primary dark:text-dark-primary flex-shrink-0 font-bold text-xl">
                      {mod.title.charAt(4)}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1 line-clamp-2">{mod.description}</p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-text-secondary dark:text-dark-text-secondary">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                          {mod.chapters.length} Chapters
                        </span>
                        <span>•</span>
                        <span>{lessons} Lessons</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer line */}
        <div className="text-center pb-8 text-sm text-text-secondary dark:text-dark-text-secondary">
          Crafted with <span className="text-error dark:text-dark-error">❤️</span> by Farhan
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
