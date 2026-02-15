import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ModuleDetail from './components/ModuleDetail';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';
import { ProgressProvider } from './contexts/ProgressContext';
import { QuizProvider } from './contexts/QuizContext';
import { ThemeColorProvider } from './contexts/ThemeColorContext';
import GlossaryPage from './components/GlossaryPage';
import TCodeIndexPage from './components/TCodeIndexPage';
import SproExplorerPage from './components/SproExplorerPage';
import FlashcardsPage from './components/FlashcardsPage';
import CertificationSimulator from './components/CertificationSimulator';
import CheatsheetPage from './components/CheatsheetPage';
import ScenarioMode from './components/ScenarioMode';

import { LenisProvider } from './contexts/LenisContext';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Centralized theme management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedLedgerLearning');
    if (!hasVisited) {
      setShowLandingPage(true);
    }
    setIsInitialized(true);
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem('hasVisitedLedgerLearning', 'true');
    setShowLandingPage(false);
  };

  // Avoid a flicker while we check localStorage
  if (!isInitialized) {
    return null;
  }

  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <ProgressProvider>
      <QuizProvider>
        <ThemeColorProvider>
          <HashRouter>
            <LenisProvider>
              <div className="flex flex-col min-h-screen bg-background text-text-primary dark:bg-dark-background dark:text-dark-text-primary transition-colors duration-300 relative overflow-x-hidden">

                {/* Dynamic Background */}
                <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] animate-float opacity-70" style={{ animationDuration: '8s' }} />
                  <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-accent/20 dark:bg-accent/10 rounded-full blur-[100px] animate-float opacity-60" style={{ animationDuration: '10s', animationDelay: '1s' }} />
                  <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-primary-light/20 dark:bg-primary-light/10 rounded-full blur-[100px] animate-float opacity-60" style={{ animationDuration: '12s', animationDelay: '2s' }} />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                  <Header toggleTheme={toggleTheme} theme={theme} />
                  <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/modules/:moduleId" element={<ModuleDetail />} />
                      <Route path="/modules/:moduleId/chapters/:chapterId/lessons/:lessonId" element={<ModuleDetail />} />
                      <Route path="/modules/:moduleId/chapters/:chapterId/quiz" element={<ModuleDetail />} />
                      <Route path="/glossary" element={<GlossaryPage />} />
                      <Route path="/tcodes" element={<TCodeIndexPage />} />
                      <Route path="/spro" element={<SproExplorerPage />} />
                      <Route path="/flashcards" element={<FlashcardsPage />} />
                      <Route path="/certification" element={<CertificationSimulator />} />
                      <Route path="/scenarios" element={<ScenarioMode />} />
                      <Route path="/cheatsheets" element={<CheatsheetPage />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/welcome" element={<LandingPage onGetStarted={() => window.history.back()} />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </div>
            </LenisProvider>
          </HashRouter>
        </ThemeColorProvider>
      </QuizProvider>
    </ProgressProvider>
  );
}

export default App;