import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';

const MainLayout = ({ children, showHeader = true }) => {
  return (
    <>
      {showHeader && <Header />}
      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default MainLayout;