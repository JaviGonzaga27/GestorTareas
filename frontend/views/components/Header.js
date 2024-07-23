import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../../controllers/user_controller';
import TaskIcon from '@mui/icons-material/AssignmentTurnedIn';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3a6186 30%, #89253e 90%)',
  boxShadow: '0 3px 5px 2px rgba(58, 97, 134, .3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1, 1),
  padding: theme.spacing(0.5, 2),
  borderRadius: 20,
  transition: 'all 0.3s',
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
}));

const LogoIcon = styled(TaskIcon)(({ theme }) => ({
  fontSize: '2.5rem',
  marginRight: theme.spacing(2),
  color: '#fff',
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 15,
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3a6186 30%, #89253e 90%)',
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'center',
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 20,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(1),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(1),
}));

const Header = () => {
  const router = useRouter();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
    router.push('/login');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <LogoIcon />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '1px', color: '#fff' }}>
            Administrador de Tareas
          </Typography>
          <Box>
            <Link href="/tasks" passHref>
              <StyledButton startIcon={<TaskIcon />}>
                Tareas
              </StyledButton>
            </Link>
            <StyledButton
              onClick={handleLogoutClick}
              startIcon={<LogoutIcon />}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                }
              }}
            >
              Cerrar Sesión
            </StyledButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <StyledDialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <StyledDialogTitle id="alert-dialog-title">
          {"Confirmar cierre de sesión"}
          <IconButton
            aria-label="close"
            onClick={handleLogoutCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas cerrar sesión? Se perderán los cambios no guardados.
          </DialogContentText>
        </StyledDialogContent>
        <StyledDialogActions>
          <ConfirmButton onClick={handleLogoutConfirm} autoFocus>
            Cerrar Sesión
          </ConfirmButton>
          <CancelButton onClick={handleLogoutCancel} variant="outlined" color="primary">
            Cancelar
          </CancelButton>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

export default Header;