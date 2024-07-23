import React from 'react';
import { Typography, Container, Box, Button, Paper, Avatar } from '@mui/material';
import Link from 'next/link';
import LoginForm from '../views/components/LoginForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius * 5,
  padding: theme.spacing(1, 3),
}));

export default function Login() {
  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <StyledAvatar>
          <LockOutlinedIcon fontSize="large" />
        </StyledAvatar>
        <Typography component="h1" variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>
        <LoginForm />
        <Box sx={{ mt: 3, width: '100%' }}>
          <Link href="/" passHref>
            <StyledButton fullWidth variant="outlined" color="primary">
              Volver al Inicio
            </StyledButton>
          </Link>
          <Link href="/register" passHref>
            <StyledButton fullWidth variant="contained" color="secondary">
              ¿No tienes una cuenta? Registrate
            </StyledButton>
          </Link>
        </Box>
      </StyledPaper>
    </Container>
  );
}