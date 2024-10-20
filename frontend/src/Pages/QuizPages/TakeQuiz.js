import React, { useState, useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import topics from "../../data/training-courses-data/topics"; // Adjust the path as needed


// Styled Components (same as before)
const QuizContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
`;

const QuestionTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const OptionButton = styled.button`
  display: block;
  background-color: ${({ isCorrect, isWrong, selected }) =>
    isCorrect ? '#28a745' : isWrong ? '#dc3545' : selected ? '#007bff' : '#f1f1f1'};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #e2e2e2;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Timer = styled.div`
  font-size: 1.2rem;
  text-align: right;
  margin-bottom: 1.5rem;
  color: #ff5252;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavigationButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #218838;
  }
`;

const TakeQuiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { chapterId, quizDuration } = state; // Include quizDuration from the state

  // Find the selected chapter from the data
  const selectedChapter = topics["training-courses"].find(topic => topic.id === chapterId);
  const questions = selectedChapter ? selectedChapter.questions : [];

  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(quizDuration * 60); // Convert minutes to seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionClick = (questionId, selectedOptionId) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOptionId }));
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctOptionId) {
        score++;
      }
    });
    navigate('/results', { state: { score, totalQuestions: questions.length, userAnswers, questions } });
  };

  return (
    <QuizContainer>
      <h2>{selectedChapter.title}</h2>
      <Timer>Time Remaining: {Math.floor(timeRemaining / 60)} minutes {timeRemaining % 60} seconds</Timer>

      <QuestionTitle>{questions[currentQuestionIndex].questionText}</QuestionTitle>

      {questions[currentQuestionIndex].options.map((option) => {
        const isSelected = userAnswers[questions[currentQuestionIndex].id] === option.id;
        const isCorrect = option.id === questions[currentQuestionIndex].correctOptionId && isSelected;
        const isWrong = option.id !== questions[currentQuestionIndex].correctOptionId && isSelected;
        
        return (
          <OptionButton
            key={option.id}
            onClick={() => handleOptionClick(questions[currentQuestionIndex].id, option.id)}
            isCorrect={isCorrect}
            isWrong={isWrong}
            selected={isSelected}
            disabled={userAnswers[questions[currentQuestionIndex].id] !== undefined}
          >
            {option.text}
          </OptionButton>
        );
      })}

      <ButtonContainer>
        {currentQuestionIndex > 0 && (
          <NavigationButton onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Previous
          </NavigationButton>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <NavigationButton onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
            Next
          </NavigationButton>
        ) : (
          <SubmitButton onClick={handleSubmit}>Submit Quiz</SubmitButton>
        )}
      </ButtonContainer>
    </QuizContainer>
  );
};

export default TakeQuiz;
