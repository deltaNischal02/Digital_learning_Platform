// src/components/ProgressBar.js

import React from 'react';
import styled from 'styled-components';
import { useUserProgress } from '../contexts/UserProgressContext';


const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0df;
  border-radius: 10px;
  margin: 1rem 0;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  background-color: purple;
  height: 10px;
  border-radius: 10px;
  transition: width 0.5s;
`;

const ProgressText = styled.p`
  text-align: center;
  margin-top: 0.5rem;
`;

const ProgressBar = () => {
  const { progress } = useUserProgress();
  const completionRate = (progress.completedQuizzes / progress.totalQuizzes) * 100;

  return (
    <>
      <ProgressBarContainer>
        <Progress progress={completionRate}></Progress>
      </ProgressBarContainer>
      <ProgressText>
        {progress.completedQuizzes}/{progress.totalQuizzes} Quizzes Completed
      </ProgressText>
    </>
  );
};

export default ProgressBar;
