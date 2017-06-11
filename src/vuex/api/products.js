import axios from 'axios';
import cfg from '@/configs/config.js';

const URL = cfg.API;

export default {
  products() {
    return axios.get(URL+'ProductService.php/all');
  },
  searchavgproduct(searchdata){
    return axios.post(URL+'ProductService.php/searchsummary',searchdata);
  },
}