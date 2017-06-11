import axios from 'axios';
import cfg from '@/configs/config.js';

const URL = cfg.API;

export default {  
  init() {
    console.log('------api init-------');
    return axios.post(URL+'AppService.php/init');
  },
}