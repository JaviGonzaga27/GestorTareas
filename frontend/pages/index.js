import React from 'react';
import { Typography, Button, Box, Container, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  },
}));

export default function Home() {
  return (
    <Container component="main" maxWidth={false} disableGutters>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <StyledPaper elevation={6}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 100, color: '#764ba2', mb: 2 }} />
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  Administrador de tareas
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#666', mb: 4 }}>
                  Organiza tus tareas de manera eficiente y aumenta tu productividad
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <Link href="/login" passHref>
                  <StyledButton fullWidth variant="contained" color="primary" startIcon={<LoginIcon />} sx={{ mb: 2 }}>
                    Iniciar Sesión
                  </StyledButton>
                </Link>
                <Link href="/register" passHref>
                  <StyledButton fullWidth variant="outlined" color="primary" startIcon={<PersonAddIcon />}>
                    Registrarse
                  </StyledButton>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Container>
  );
}