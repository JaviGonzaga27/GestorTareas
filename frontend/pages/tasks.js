import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box, Button, Modal, Paper, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../views/layouts/MainLayout';
import withAuth from '../views/components/withAuth';
import { getTasks, deleteTask } from '../controllers/task_controller';
import TaskForm from '../views/components/TaskForm';
import TaskList from '../views/components/TaskList';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 20,
  padding: theme.spacing(1, 3),
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  width: '400px',
  maxWidth: '90%',
}));

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const refreshTasks = useCallback(async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
    }
  }, []);

  const handleTaskAdded = useCallback((newTask) => {
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
    refreshTasks();
  }, [refreshTasks, tasks]);

  const handleTaskUpdated = useCallback((updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
    setIsModalOpen(false);
    refreshTasks();
  }, [refreshTasks, tasks]);

  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleDeleteTask = useCallback(async (taskId) => {
    if (!taskId) {
      console.error('No task ID provided for deletion');
      return;
    }
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
    refreshTasks();
  }, [refreshTasks]);

  const handleOpenModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <StyledPaper elevation={3}>
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                Tareas
              </Typography>
            </Grid>
            <Grid item>
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenModal}
              >
                Nueva Tarea
              </StyledButton>
            </Grid>
          </Grid>
          <TaskList
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </StyledPaper>
        <StyledModal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="task-modal-title"
        >
          <ModalContent>
            <Typography id="task-modal-title" variant="h6" component="h2" gutterBottom>
              {editingTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
            </Typography>
            <TaskForm
              task={editingTask}
              onTaskAdded={handleTaskAdded}
              onTaskUpdated={handleTaskUpdated}
              onCancel={handleCloseModal}
            />
          </ModalContent>
        </StyledModal>
      </Container>
    </MainLayout>
  );
}

export default withAuth(Tasks);