import axios from 'axios';

 const URL = 'http://127.0.0.1:8000/services/';
 // const URL = '/services/';

export default {
  init() {
    console.log('------api init-------');
    return axios.post(URL+'AppService.php/init');
  },
  products() {
    return axios.get(URL+'ProductService.php/all');
  },
  categories() {
  	return axios.get(URL+'CategoryService.php/all');
  },
  lots(){
  	return axios.get(URL+'LotService.php/all');
  },
  branchbyid(id){
  	return axios.get(URL+'BranchService.php/'+id);
  },
  lotbyid(id){
  	return axios.get(URL+'LotService.php/'+id);
  },
  lotbyname(lotname) {
    console.log('actionlotbyname',lotname);
  	return axios.post(URL+'LotService.php/lotbyname/'+lotname);
  },
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