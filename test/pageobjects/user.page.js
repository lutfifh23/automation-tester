require('dotenv').config();
const axios = require('axios');

class UserPage {
    constructor() {
        this.url = 'https://gorest.co.in/public/v2/users'; // Periksa URL API
        this.token = process.env.API_TOKEN;
    }

    get headers() {
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    async createUser(data) {
        try {
            const response = await axios.post(this.url, data, { headers: this.headers });
            return response;
        } catch (error) {
            console.error('Error creating user:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getUser(userId) {
        try {
            const response = await axios.get(`${this.url}/${userId}`, { headers: this.headers });
            return response;
        } catch (error) {
            console.error('Error getting user:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async updateUser(userId, data) {
        try {
            const response = await axios.put(`${this.url}/${userId}`, data, { headers: this.headers });
            return response;
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const response = await axios.delete(`${this.url}/${userId}`, { headers: this.headers });
            return response;
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = new UserPage();
