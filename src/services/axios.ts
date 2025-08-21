import axios from 'axios';
//Добавил просто базовый URL, для примера.
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
