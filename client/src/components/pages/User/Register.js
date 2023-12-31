import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import baseUrl from '../../../conn';
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

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");




  const handleRegister = async () => {
    try {
      const response = await axios.post(`${baseUrl}/register`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      if(response.data){
        navigate("/")
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h5" align="center">Register Here !</Typography>
        <StyledTextField label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined" />
        <StyledTextField label="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined" />
        <StyledTextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type="password" />
       
        <Button variant="outlined" color="primary" fullWidth onClick={handleRegister}>
          Register Now
        </Button>
        <Typography variant="h6" align="center">Already registered ? 
        <Link to="/" style={{textDecoration:"none"}}>Login here</Link>
        </Typography>
      </StyledBox>
    </StyledContainer>
  );
};

export default Login;
