import axios from 'axios';
import cfg from '@/configs/config.js';

const URL = cfg.API;

export default {  
  bills(){
  	return axios.get(URL+'BillService.php/all');
  },
  billbyid(id){
    return axios.get(URL+'BillService.php/'+id);
  },
  delbillbyid(id){
  	return axios.post(URL+'BillService.php/delbillbyid/'+id);
  },
  insupbill(lotdata) {
    return axios.post(URL+'BillService.php/insupbill',lotdata);
  },
}