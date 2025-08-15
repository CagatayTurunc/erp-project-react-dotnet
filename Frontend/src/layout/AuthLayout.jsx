import React from 'react';
import { Box, Container } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        // bgcolor: grey['100'],
        py: 4,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: '8px',
            padding: 4,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children} {/* Buraya Login veya Register formu gelecek */}
        </Box>
      </Container>
    </Box>
  );
}