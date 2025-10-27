
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MODULES } from '../constants/modules';
import type { Module } from '../types';

const ModuleCard: React.FC<{ module: Module }> = ({ module }) => {
  const totalLessons = module.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);

  const firstChapter = module.chapters[0];
  const firstLesson = firstChapter?.lessons[0];
  const startLink = (firstChapter && firstLesson) 
    ? `/modules/${module.id}/chapters/${firstChapter.id}/lessons/${firstLesson.id}`
    : `/modules/${module.id}`;

  return (
    <Link 
      to={startLink}
      className="bg-surface dark:bg-dark-surface rounded-lg border border-border-color dark:border-dark-border-color shadow-lg hover:shadow-primary/20 dark:hover:shadow-dark-primary/20 transition-all duration-300 ease-in-out overflow-hidden flex flex-col group hover:ring-2 hover:ring-primary dark:hover:ring-dark-primary"
    >
      <div className="p-4 sm:p-6 flex-grow">
        <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">{module.title}</h2>
        </div>
        <p className="text-text-secondary dark:text-dark-text-secondary mb-4 flex-grow">{module.description}</p>
      </div>
      <div className="bg-background dark:bg-dark-background/50 border-t border-border-color dark:border-dark-border-color px-4 sm:px-6 py-3 text-sm text-text-secondary dark:text-dark-text-secondary font-medium">
        <span>{module.chapters.length} Chapters &bull; {totalLessons} Lessons</span>
      </div>
    </Link>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const lastModuleId = localStorage.getItem('lastAccessedModuleId');
    if (lastModuleId) {
      const lastModule = MODULES.find(m => m.id === lastModuleId);
      if (lastModule && lastModule.chapters.length > 0 && lastModule.chapters[0].lessons.length > 0) {
        const firstChapter = lastModule.chapters[0];
        const firstLesson = firstChapter.lessons[0];
        navigate(`/modules/${lastModule.id}/chapters/${firstChapter.id}/lessons/${firstLesson.id}`, { replace: true });
        return; // Early exit after navigation
      }
    }
    // If no last module or module is invalid, show dashboard
    setIsChecking(false);
  }, [navigate]);
  
  // Render nothing while checking to prevent dashboard flicker
  if (isChecking) {
    return null; 
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text-primary dark:text-dark-text-primary sm:text-5xl tracking-tight">
          Your Gateway to SAP Mastery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-text-secondary dark:text-dark-text-secondary">
          Choose a module to begin your journey. All courses are crafted by industry experts to provide comprehensive, real-world knowledge.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;