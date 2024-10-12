// src/components/CenteredContainer.js
import React from 'react';
import { Box } from '@mui/material';

const CenteredContainer = ({ children }) => {
    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
        >
            {children}
        </Box>
    );
};

export default CenteredContainer;
