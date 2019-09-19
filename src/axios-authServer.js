import axios from 'axios'
import storage from './storage'

const token = storage.get('token');

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

instance.defaults.headers.common['Authorization'] = token;

export default instance;