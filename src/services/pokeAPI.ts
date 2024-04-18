import axios from 'axios';
import { Config } from './config';

const axiosDefaultConfig = {
  baseURL: `${Config.baseURL}/api/v2`,
};

const pokeAPI = axios.create(axiosDefaultConfig);

export default pokeAPI;
