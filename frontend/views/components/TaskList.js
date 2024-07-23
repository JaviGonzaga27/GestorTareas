import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography 
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table aria-label="task table">
        <TableHead>
          <TableRow>
            <TableCell>Tarea</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>  {/* Asegúrate de que task.id existe y es único */}
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle1">{task.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    aria-label="edit" 
                    onClick={() => onEditTask(task)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="delete" 
                    onClick={() => onDeleteTask(task.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="subtitle1">No tasks available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;