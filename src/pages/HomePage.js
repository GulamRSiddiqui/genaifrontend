// src/components/Home.js
import React, {useContext,useEffect} from 'react';
import { Typography } from '@mui/material';
import CenteredContainer from '../components/CenteredContainer';
import AuthContext from '../context/AuthContext';
import { verifyToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { loginUser, authTokens, user } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate
    useEffect(() => {
        
        const authTokens = localStorage.getItem('access_token');
        // alert(`1111111 this is form Home Page ${authTokens}`);
        const checkLogin = async () => {
          if (authTokens) {
            const isValid= await verifyToken(authTokens)
            if (!isValid) {
            localStorage.removeItem('access_token');
            navigate('/login'); // Redirect to home if token is valid
            }
          }
        };
        checkLogin();
      }, [authTokens, navigate]);

    return (
        <CenteredContainer>
            <Typography variant="h4">{user ? user.username : ''} Welcome to the Home Page!</Typography>
       </CenteredContainer>
    );
};

export default HomePage;
