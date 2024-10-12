import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import Logo from './Logo';

  const FooterWithLogo = () => {
    return (
      <Box component="footer" sx={{ bgcolor: '#f0f0f0', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Logo sx={{ width: 150, height: 'auto' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://yourdomain.com/">
              Your Company Name
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    );
  };

  export default FooterWithLogo;
