// controllers/user_controller.js
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

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/token/`, { username, password });
        if (response.data.access) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/`, userData, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/users/${userId}/`, { headers: getAuthHeader() });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/`, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};