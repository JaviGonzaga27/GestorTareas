import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { register } from '../../controllers/user_controller';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius * 3,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
        },
    },
    '& .MuiInputLabel-root': {
        transform: 'translate(14px, 16px) scale(1)',
        '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
            background: 'white',
            padding: '0 4px',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 3,
    padding: theme.spacing(1.5, 0),
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s',
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
    },
}));

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.username = username ? "" : "El nombre de usuario es requerido";
        tempErrors.email = /\S+@\S+\.\S+/.test(email) ? "" : "Email inválido";
        tempErrors.password = password.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres";
        tempErrors.confirmPassword = password === confirmPassword ? "" : "Las contraseñas no coinciden";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await register({ username, email, password });
                setSnackbarMessage('Usuario creado exitosamente');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } catch (error) {
                console.error('Registration failed:', error);
                
                if (error.response?.status === 400) {
                    const errorDetail = error.response.data;
                    if (errorDetail.username) {
                        setErrors(prev => ({ ...prev, username: 'Este nombre de usuario ya está en uso' }));
                        setSnackbarMessage('Este nombre de usuario ya está registrado');
                    } else if (errorDetail.email) {
                        setErrors(prev => ({ ...prev, email: 'Este correo electrónico ya está registrado' }));
                        setSnackbarMessage('Este correo electrónico ya está registrado');
                    } else {
                        setSnackbarMessage('Error en el registro. Por favor, verifica tus datos.');
                    }
                } else {
                    setSnackbarMessage('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
                }
                
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } else {
            setSnackbarMessage('Por favor, corrija los errores en el formulario');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonOutlineIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlinedIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlinedIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 2 }}
                >
                    Registrarse
                </StyledButton>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default RegisterForm;