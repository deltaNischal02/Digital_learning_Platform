import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/signup';
// import LoginPage from './Pages/login'; // Example of another route

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<SignupPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* Add other routes here */}
        </Routes>
    
    </Router>
  );
}

export default App;
