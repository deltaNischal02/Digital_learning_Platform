import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios'; // Add axios for API calls
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import eye icons for password toggle


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

// Styled component for Snackbar
const Snackbar = styled.div`
  position: fixed;
  bottom: 30px;
  left: 40%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.type === 'success' ? '#28a745' : '#dc3545')};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${(props) => (props.open ? fadeIn : fadeOut)} 0.5s forwards;
  z-index: 1000;
`;
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;
const PasswordWrapper = styled.div`
  position: relative;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1.1rem;

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  width: 95%;
  padding: 14px 10px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -12px;
    font-size: 0.85rem;
    color: #007bff;
    background-color: white;
    padding: 0 5px;
    left: 12px;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #aaa;
  transition: 0.3s ease;
  pointer-events: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #007bff, #00bfff);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #0088ff);
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(135deg, #004494, #006bb3);
    transform: translateY(0);
  }
`;

const LinkText = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  text-align: center;
  margin-top: 1.5rem;

  a {
    color: #007bff;
    text-decoration: underline;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('error'); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7001/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // On success
        setSnackbarMessage('Login successful! Redirecting...');
        setSnackbarType('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
          navigate('/dashboard'); // Redirect to home after successful login
        }, 2000);
      }
    } catch (err) {
      // On error
      setSnackbarMessage(  err.response?.data?.message || 'Login failed! Please try again.');
      setSnackbarType('error');
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
    }
  };
   // Toggle password visibility
   const togglePassword = (e) => {
    e.preventDefault(); // Prevent form submission when clicking the icon
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Label>Username</Label>
        </InputWrapper>

        <PasswordWrapper>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label>Password</Label>
          </InputWrapper>
          <TogglePasswordButton onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/Hide Icon */}
          </TogglePasswordButton>
        </PasswordWrapper>
        

        <Button type="submit">Login</Button>
      </form>

      <LinkText>
        Don't have an account? <Link to="/">Sign up here</Link>
      </LinkText>
        {/* Snackbar */}
        {snackbarOpen && (
        <Snackbar type={snackbarType} open={snackbarOpen}>
             {snackbarType === 'success' ? (
        <FaCheckCircle style={{ fontSize: '1rem' }} />
      ) : (
        <FaTimesCircle style={{ fontSize: '1rem' }} />
      )}
             {  snackbarMessage}
        </Snackbar>
      )}

    </LoginContainer>
    
  );
};

export default LoginPage;
