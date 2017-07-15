import axios from 'axios';
import cfg from '@/configs/config.js';

const URL = cfg.API;

export default {  
  addsupplier(supplier) {
    console.log('supplierservice.php/Addsupplier',supplier);
  	return axios.post(URL+'supplierservice.php/Addsupplier',supplier);
  },

}
