const axios = require('axios');
const url = 'http://localhost:3002/api'

const Api = {
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
  },
  getDraftOrder: async () => {
    const response = await axios.get(`${url}/draft-order`);
    return response;
  },
  getCurrentYearDraftOrder: async () => {
    const response = await axios.get(`${url}/draft-order/current`);
    return response;
  }
}

export default Api;