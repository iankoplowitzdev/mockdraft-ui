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
  getDraftOrders: async () => {
    const response = await axios.get(`${url}/draft-orders`);
    return response;
  },
  getCurrentYearDraftOrder: async () => {
    const response = await axios.get(`${url}/draft-orders/current`);
    return response;
  },
  getTradeCharts: async () => {
    const response = await axios.get(`${url}/trade-charts/current`);
    return response;
  },
  getCurrentYearTradeChart: async () => {
    const response = await axios.get(`${url}/trade-charts/current`);
    return response;
  },
  getInitialMockDraftData: async () => {
    const response = await axios.get(`${url}/mock-draft`);
    return response;
  }
}

export default Api;