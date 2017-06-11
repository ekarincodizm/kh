import axios from 'axios';
import cfg from '@/configs/config.js';

const URL = cfg.API;

export default {  
  lots(){
  	return axios.get(URL+'LotService.php/all');
  },
  lotbyid(id){
  	return axios.get(URL+'LotService.php/'+id);
  },
  lotbyname(lotname) {
    console.log('actionlotbyname',lotname);
  	return axios.post(URL+'LotService.php/lotbyname/'+lotname);
  },

}