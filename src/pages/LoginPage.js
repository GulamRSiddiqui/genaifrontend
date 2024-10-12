import React, { useContext,useEffect } from 'react';
import {useAuthContext,AuthProvider} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import AuthContext from '../context/AuthContext';
import { verifyToken } from '../utils/authUtils';


const LoginPage = () => {
  const { loginUser, authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    //alert(`22222222 this is form Login Page ${authTokens}`);
    const checkLogin = async () => {
      if (authTokens) {
        try {
          const isValid = await verifyToken(authTokens);
          if (isValid) {
            navigate('/'); // Redirect to home if token is valid
          }
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      }
    };
    checkLogin();
  }, [authTokens, navigate]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Signing in... clicck me');;
    loginUser(event);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
