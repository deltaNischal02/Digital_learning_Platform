import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const SignupContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 1rem 2rem 2rem 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 113%;
  gap: 1rem;
  margin-bottom: 1.3rem;
`;


const Input = styled.input`
  width: 80%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  transition: border-color 0.3s ease;
  position: relative;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -0.6rem;
    font-size: 0.85rem;
    color: #007bff;
    background-color: white;
    padding: 0 0.25rem;
  }
`;

const Select = styled.select`
  width: 96%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  transition: border-color 0.3s ease;
  position: relative;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.3s ease;
  color: #aaa;
  pointer-events: none;
  background-color: transparent;
  padding: 0 0.25rem;
`;

const Button = styled.button`
  width: 98%;
  padding: 1rem;
  background: linear-gradient(135deg, #007bff, #00bfff);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #0088ff);
    transform: translateY(-8px);
  }

  &:active {
    background: linear-gradient(135deg, #004494, #006bb3);
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  top: -20px;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
  font-size: 2rem;
`;

const LinkText = styled.p`
  font-size: 0.875rem;
  color: #6c757d;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [level, setLevel] = useState(4); // Default to 4
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // To redirect after successful signup

  // Automatically set role based on level
  useEffect(() => {
    setRole(level < 8 ? 'User' : 'Admin');
  }, [level]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName,
        lastName,
        phoneNumber,
        email,
        employeeId,
        level,
        department,
        role,
        username,
        password,
      };

      const res = await axios.post('http://localhost:7001/api/auth/register', newUser);

      if (res.status === 201) {
      alert("Sign up sucessful!");

        setSuccess('Signup successful! Redirecting to login...');
        setError('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong, please try again.');
      setError(err.response?.data?.message || 'Something went wrong, please try again.');
      setSuccess('');
      console.error(err); // Log error for debugging
    }
  };

  return (
    <SignupContainer>
      <Title>Create Your Account</Title>
      <form onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <FormRow>
          <InputWrapper>
            <Input
              type="text"
              placeholder=" "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Label>First Name</Label>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="text"
              placeholder=" "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Label>Last Name</Label>
          </InputWrapper>
        </FormRow>

        {/* Contact Number and Email */}
        <FormRow>
          <InputWrapper>
          <Input
            type="number" // Change to tel for better input handling on mobile
            placeholder=" "
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="\d{10}" // Regex pattern to enforce 10 digits
            maxLength={10} // Limit input to 10 characters
          />
            <Label>Contact Number</Label>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label>Email</Label>
          </InputWrapper>
        </FormRow>

        {/* Employee ID and Level */}
        <FormRow>
          <InputWrapper>
            <Input
              type="number"
              placeholder=" "
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
            <Label>Employee ID</Label>
          </InputWrapper>
          <InputWrapper>
            <Select value={level} onChange={(e) => setLevel(Number(e.target.value))} required>
              {[...Array(8)].map((_, i) => (
                <option key={i} value={i + 4}>
                  Level {i + 4}
                </option>
              ))}
            </Select>
            <Label></Label>
          </InputWrapper>
        </FormRow>

        {/* Department and Role */}
        <FormRow>
          <InputWrapper>
            <Select value={department} onChange={(e) => setDepartment(e.target.value)} required>
              <option value="" disabled>Select Department</option>
              <option value="ARFF">ARFF</option>
              <option value="ATC">ATC</option>
              <option value="IT">IT</option>
              <option value="MECHANICAL">Mechanical</option>
            </Select>
            <Label></Label>
          </InputWrapper>
          <InputWrapper>
            <Select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Select>
            <Label></Label>
          </InputWrapper>
        </FormRow>

        {/* Username and Password */}
        
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
        <InputWrapper>
          <Input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Label>Password</Label>
        </InputWrapper>
        <Button type="submit">Sign Up</Button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <LinkText>
        Already have an account? <Link to="/login">Login here</Link>
      </LinkText>
    </SignupContainer>
  );
};

export default SignupPage;
