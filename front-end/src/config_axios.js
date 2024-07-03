import axios from "axios";
//Axios com a URL base do Web Service
export const inAxios = axios.create({baseURL: 'http://localhost:3001/'});