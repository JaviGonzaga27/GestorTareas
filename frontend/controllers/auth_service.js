// controllers/auth_service.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Ajusta esto a la URL de tu backend

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/token/`, { username, password });
        if (response.data.access) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};