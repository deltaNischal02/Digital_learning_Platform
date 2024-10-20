import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ResultsContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.h2`
  margin-bottom: 1rem;
`;

const SummaryItem = styled.div`
  margin-bottom: 1rem;
`;

const ResultsPage = () => {
  const { state } = useLocation();
  const { score, totalQuestions, userAnswers, questions } = state;

  return (
    <ResultsContainer>
      <SummaryTitle>Your Score: {score}/{totalQuestions}</SummaryTitle>
      <SummaryItem>
        <strong>Summary:</strong>
        <p>{(score / totalQuestions * 100).toFixed(2)}% Correct</p>
      </SummaryItem>
      {questions.map((question) => (
        <SummaryItem key={question.id}>
          <p>{question.question}</p>
          <p>Your Answer: {userAnswers[question.id]}</p>
          <p>Correct Answer: {question.correctAnswer}</p>
          <p>{userAnswers[question.id] === question.correctAnswer ? "Correct" : "Incorrect"}</p>
        </SummaryItem>
      ))}
    </ResultsContainer>
  );
};

export default ResultsPage;
