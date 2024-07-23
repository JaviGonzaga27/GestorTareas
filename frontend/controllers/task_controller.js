// controllers/task_controller.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
        return { Authorization: `Bearer ${user.access}` };
    } else {
        return {};
    }
};

const handleApiError = (error, operation) => {
    console.error(`Error ${operation}:`, error);
    if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up request:', error.message);
    }
    throw error;
};

export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks/`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        handleApiError(error, 'fetching tasks');
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${API_URL}/tasks/`, taskData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        handleApiError(error, 'creating task');
    }
};

export const updateTask = async (taskId, taskData) => {
    if (!taskId) {
        throw new Error('Task ID is required for updating');
    }
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}/`, taskData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        handleApiError(error, `updating task ${taskId}`);
    }
};

export const deleteTask = async (taskId) => {
    if (!taskId) {
        throw new Error('Task ID is required for deletion');
    }
    try {
        await axios.delete(`${API_URL}/tasks/${taskId}/`, { headers: getAuthHeader() });
    } catch (error) {
        handleApiError(error, `deleting task ${taskId}`);
    }
};