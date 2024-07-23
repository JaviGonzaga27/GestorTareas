import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from '@mui/material/colors';
import { createTask, updateTask } from '../../controllers/task_controller';

const TaskForm = ({ task, onTaskAdded, onTaskUpdated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
    setSuccess(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSuccess(false);
    try {
      if (task) {
        const updatedTask = await updateTask(task.id, { title, description });
        onTaskUpdated(updatedTask);
      } else {
        const newTask = await createTask({ title, description });
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
        onChange={(e) => setTitle(e.target.value)}
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
        onChange={(e) => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        disabled={isSubmitting}
      />
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