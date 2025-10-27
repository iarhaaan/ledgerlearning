import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ModuleDetail from './components/ModuleDetail';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';
import { ProgressProvider } from './contexts/ProgressContext';
import { QuizProvider } from './contexts/QuizContext';
import GlossaryPage from './components/GlossaryPage';
import TCodeIndexPage from './components/TCodeIndexPage';
import SproExplorerPage from './components/SproExplorerPage';

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
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-background text-text-primary dark:bg-dark-background dark:text-dark-text-primary transition-colors duration-300">
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
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </QuizProvider>
    </ProgressProvider>
  );
}

export default App;