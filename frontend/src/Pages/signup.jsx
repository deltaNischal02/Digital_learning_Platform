import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; // Add axios to make API calls

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 110%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const[role,setRole]= useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [level, setLevel] = useState('');
  const [department,setDepartment]=useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate(); // To redirect after successful signup

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare the data to send to the backend
      const newUser = {
        firstName,
        lastName,
        username,
        password,
        email,
        role,
        phoneNumber,
        employeeId,
        level,
        department,
      };

      // Send POST request to the backend API for signup
      const response = await axios.post('http://localhost:7001/api/auth/register',newUser);

      // Handle successful signup
      if (response.status === 201) {
        setSuccess('Signup successful! Redirecting to login...');
        setError('');
        // Optionally, redirect the user to the login page after signup
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      // Handle errors (e.g., validation or server errors)
      setError(err.response?.data?.message || 'Something went wrong, please try again.');
      setSuccess('');
    }
  };

  return (
    <SignupContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <Input
          type="text"
          placeholder="Contact Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <p>{success}</p>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </SignupContainer>
  );
};

export default SignupPage;
