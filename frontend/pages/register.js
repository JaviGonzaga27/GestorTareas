import React from 'react';
import { Typography, Container, Box, Button, Paper, Avatar } from '@mui/material';
import Link from 'next/link';
import RegisterForm from '../views/components/RegisterForm';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';

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
  textTransform: 'none',
  fontWeight: 'bold',
}));

export default function Register() {
    return (
        <Container component="main" maxWidth="xs">
            <StyledPaper elevation={6}>
                <StyledAvatar>
                    <PersonAddIcon fontSize="large" />
                </StyledAvatar>
                <Typography component="h1" variant="h4" gutterBottom>
                    Registrarse
                </Typography>
                <RegisterForm />
                <Box sx={{ mt: 3, width: '100%' }}>
                    <Link href="/" passHref>
                        <StyledButton 
                            fullWidth 
                            variant="outlined" 
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                        >
                            Volver al Inicio
                        </StyledButton>
                    </Link>
                    <Link href="/login" passHref>
                        <StyledButton 
                            fullWidth 
                            variant="contained" 
                            color="secondary"
                            startIcon={<LoginIcon />}
                            sx={{ mt: 2 }}
                        >
                            ¿Ya tienes una cuenta? Inicia Sesión
                        </StyledButton>
                    </Link>
                </Box>
            </StyledPaper>
        </Container>
    );
}