import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import { createTask, updateTask } from '../../controllers/task_controller';

const TaskForm = ({ task, onTaskAdded, onTaskUpdated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const validateField = useCallback((name, value) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} es requerido`;
    }
    return '';
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    if (!description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCancel = () => {
    if (title !== task?.title || description !== task?.description || completed !== task?.completed) {
      setShowCancelDialog(true);
    } else {
      onCancel();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSuccess(false);
    try {
      if (task) {
        const updatedTask = await updateTask(task.id, { title, description, completed });
        onTaskUpdated(updatedTask);
      } else {
        const newTask = await createTask({ title, description, completed });
        onTaskAdded(newTask);
      }
      setTitle('');
      setDescription('');
      setErrors({});
      setSuccess(true);
      // Opcionalmente, puedes cerrar el formulario después de un tiempo
      setTimeout(() => onCancel(), 2000);
    } catch (error) {
      console.error('Error saving task:', error);
      setErrors({ submit: 'Error al guardar la tarea. Por favor, inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Tarea"
        name="title"
        autoFocus
        value={title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        disabled={isSubmitting}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Descripción de la tarea"
        name="description"
        multiline
        rows={4}
        value={description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        disabled={isSubmitting}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body1" sx={{ mr: 2 }}>Completada:</Typography>
        <Switch
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          disabled={isSubmitting}
          inputProps={{ 'aria-label': 'Tarea completada' }}
        />
      </Box>
      {errors.submit && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.submit}
        </Typography>
      )}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {task ? 'Actualizar tarea' : 'Agregar Tarea'}
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </Box>
      {success && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <CheckCircleOutlineIcon sx={{ color: green[500], mr: 1 }} />
          <Typography color="success.main">
            Guardado exitosamente
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaskForm;