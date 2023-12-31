// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import baseUrl from '../../../conn';
import DataContext from '../../../context/DataContext';

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  width: 100%;
  height: 60%;
  padding: 24px;
  background-color: #f8f8f8;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    width: 100%;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useContext(DataContext);

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const storedUserEmail = localStorage.getItem('useremail');
    if (storedUserEmail) {
      setUserAuth((prevUserAuth) => ({
        ...prevUserAuth,
        isLoggedIn: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setUserAuth((prevUserAuth) => ({
      ...prevUserAuth,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/login`, userAuth);
      console.log(response.data);

      if (response.data) {
        setUserAuth((prevUserAuth) => ({
          ...prevUserAuth,
          isLoggedIn: true,
        }));
        localStorage.setItem('useremail', response.data.email);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (userAuth.isLoggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <StyledTextField
          label="Email"
          name="email"
          value={userAuth.email}
          onChange={handleChange}
          variant="outlined"
        />
        <StyledTextField
          label="Password"
          name="password"
          value={userAuth.password}
          onChange={handleChange}
          variant="outlined"
          type="password"
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outlined" color="primary" fullWidth onClick={() => navigate('/register')}>
          Register Now
        </Button>
      </StyledBox>
    </StyledContainer>
  );
};

export default Login;
