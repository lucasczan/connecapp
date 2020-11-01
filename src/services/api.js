import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://connec-api.herokuapp.com',
});
