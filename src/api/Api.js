const axios = require('axios');
const url = 'http://localhost:3002/api'

const api = {
  getPlayers: async () => {
    const response = await axios.get(`${url}/players`);
    return response;
  },
  getTeams: async () => {
    const response = await axios.get(`${url}/teams`);
    return response;
  },
  getPositions: async () => {
    const response = await axios.get(`${url}/positions`);
    return response;
  }
}

module.exports = api;