// src/contexts/UserProgressContext.js

import React, { createContext, useContext, useState } from 'react';

const UserProgressContext = createContext();

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    completedQuizzes: 0,
    totalQuizzes: 10, // Update with actual total quizzes count
    scores: [],
  });

  const updateProgress = (newScore) => {
    setProgress((prev) => ({
      completedQuizzes: prev.completedQuizzes + 1,
      totalQuizzes: prev.totalQuizzes,
      scores: [...prev.scores, newScore],
    }));
  };

  return (
    <UserProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
};
