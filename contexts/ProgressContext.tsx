import React, { createContext, useState, useEffect, useContext } from 'react';

interface ProgressContextType {
  completedLessons: Set<string>;
  markAsComplete: (lessonId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem('completedLessons');
      if (storedCompleted) {
        setCompletedLessons(new Set(JSON.parse(storedCompleted)));
      }
    } catch (error) {
      console.error("Failed to parse completed lessons from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
    }
  }, [completedLessons, isLoaded]);

  const markAsComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set(prev).add(lessonId));
  };

  return (
    <ProgressContext.Provider value={{ completedLessons, markAsComplete }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};