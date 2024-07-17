import axios from 'axios';

const BASE_URL = 'http://localhost:8000';


const getToken = () => {
    return localStorage.getItem('token');
}

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/token`, new URLSearchParams({
            username: username,
            password: password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const createUser = async (username, email, password) => {
    try {
        const body = {
            username,
            email, 
            password
        }
        const response = await axios.post(`${BASE_URL}/users/`, body);
        return response.data;
    } catch (error) {
        console.error('Create user error:', error);
        throw error;
    }
};

export const getCurrentUser = async () => {
    const token = getToken();
    try {
        const response = await axios.get(`${BASE_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Get current user error:', error);
        throw error;
    }
};

export const createTicket = async (ticket) => {
    const token = getToken();
    console.log(token)
    try {
        const response = await axios.post(`${BASE_URL}/tickets/`, ticket, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Create ticket error:', error);
        throw error;
    }
};

export const getTickets = async (skip = 0, limit = 10) => {
    const token = getToken();
    try {
        const response = await axios.get(`${BASE_URL}/tickets/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                skip: skip,
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Get tickets error:', error);
        throw error;
    }
};

export const getTicket = async (ticketId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Get ticket error:', error);
        throw error;
    }
};

export const updateTicket = async (ticketId, newStatus) => {
    const token = getToken();
    try {
        const response = await axios.put(`${BASE_URL}/tickets/${ticketId}`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Update ticket error:', error);
        throw error;
    }
};

export const deleteTicket = async (ticketId, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/tickets/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Delete ticket error:', error);
        throw error;
    }
};

export const createCommentOnTicket = async (ticketId, commentData) => {
    const token = getToken();
    try {
        const response = await axios.post(`${BASE_URL}/tickets/${ticketId}/comments`, commentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Create comment error:', error);
        throw error;
    }
};

export const getComments = async (ticketId) => {
    const token = getToken();
    try {
        const response = await axios.get(`${BASE_URL}/tickets/${ticketId}/comments`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Get comments error:', error);
        throw error;
    }
};

