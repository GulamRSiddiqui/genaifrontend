// src/components/Logo.js
import React from 'react';
import logo from '../assets/images/Logo.png'; // Adjust the path according to your structure
import { Box } from '@mui/material';

const Logo = () => {
    return (
        <Box component="img" src={logo} alt="Company Logo" sx={{ height: '60px' }} />
    );
};

export default Logo;
