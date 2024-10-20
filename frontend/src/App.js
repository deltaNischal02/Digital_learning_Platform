// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignupPage from './Pages/signup';
import LoginPage from './Pages/login';
import UserDashboard from './Pages/userDashboard';
import Sidebar from './Components/sidebar';
import UploadPage from './Pages/UploadPage';
import TrainingCoursesQuiz from './Pages/QuizPages/TraningCoursesQuiz';
// import GeneralKnowlegeQuiz from './Pages/QuizPages/GeneralKnowledge';

import TakeQuiz from './Pages/QuizPages/TakeQuiz';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background-color: #f4f4f4;
  margin-left: ${({ showSidebar }) => (showSidebar ? '280px' : '0')};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ showSidebar }) => (showSidebar ? '280px' : '0')};
  }
`;

const App = () => {
  const location = useLocation();

  // Define routes where the sidebar should be hidden
  const hideSidebarRoutes = ['/', '/login'];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <Container>
      {showSidebar && <Sidebar />}
      <Content showSidebar={showSidebar}>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          {/* Routes for SubMenuItem */}
          <Route path="/quizzes/training-courses" element={<TrainingCoursesQuiz />} />
          {/* <Route path="/quizzes/general-knowledge" element   ={<GeneralKnowledgeQuiz />} /> */}
          <Route path="/quiz/take" element={<TakeQuiz />} />
          {/* Add other routes as necessary */}
        </Routes>
      </Content>
    </Container>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
