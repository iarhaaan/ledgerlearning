import React, { createContext, useState, useEffect, useContext } from 'react';

export interface QuizState {
  answers: Record<number, number>;
  submitted: boolean;
  score: number;
}

interface QuizContextType {
  getQuizState: (quizId: string) => QuizState;
  updateQuizAnswer: (quizId: string, questionIndex: number, optionIndex: number) => void;
  submitQuiz: (quizId: string, score: number) => void;
  resetQuiz: (quizId: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialQuizState: QuizState = {
    answers: {},
    submitted: false,
    score: 0,
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allQuizStates, setAllQuizStates] = useState<Record<string, QuizState>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedStates = localStorage.getItem('quizStates');
      if (storedStates) {
        setAllQuizStates(JSON.parse(storedStates));
      }
    } catch (error) {
      console.error("Failed to parse quiz states from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quizStates', JSON.stringify(allQuizStates));
    }
  }, [allQuizStates, isLoaded]);

  const getQuizState = (quizId: string): QuizState => {
    return allQuizStates[quizId] || initialQuizState;
  };

  const updateQuizAnswer = (quizId: string, questionIndex: number, optionIndex: number) => {
    setAllQuizStates(prev => {
        const currentQuiz = prev[quizId] || initialQuizState;
        const newAnswers = { ...currentQuiz.answers, [questionIndex]: optionIndex };
        return {
            ...prev,
            [quizId]: { ...currentQuiz, answers: newAnswers, submitted: false }
        };
    });
  };

  const submitQuiz = (quizId: string, score: number) => {
     setAllQuizStates(prev => {
        const currentQuiz = prev[quizId] || initialQuizState;
        return {
            ...prev,
            [quizId]: { ...currentQuiz, submitted: true, score }
        };
    });
  };
  
  const resetQuiz = (quizId: string) => {
    setAllQuizStates(prev => {
        const newStates = { ...prev };
        delete newStates[quizId];
        return newStates;
    });
  };

  return (
    <QuizContext.Provider value={{ getQuizState, updateQuizAnswer, submitQuiz, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
