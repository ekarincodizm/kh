import axios from 'axios';
import cfg from '@/configs/config.js';

const URL = cfg.API;

export default {  
  categories() {
  	return axios.get(URL+'CategoryService.php/all');
  },
}