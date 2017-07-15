import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import ElementUI from 'element-ui'
import Resource from 'vue-resource'
import locale from 'element-ui/lib/locale/lang/en'
import collect from 'collect.js'
import axios from 'axios';
import Vue2Filters from 'vue2-filters'

// https://github.com/freearhey/vue2-filters
Vue.use(Vue2Filters)

// import lodash from 'lodash';
// window._ = require('lodash'); 

// Vue.use({
//   install: function(Vue, name = '$_') {
//     Object.defineProperty(Vue.prototype, name, { value: lodash });
//   }
// });

import bootbox from './bootbox'

Vue.use({
  install: function(Vue, name = '$bootbox') {
    Object.defineProperty(Vue.prototype, name, { value: bootbox });
  }
});

// import mixin from './mixin'
// Vue.mixin(mixin);

const vueConfig = require('vue-config')
const configs = {
  API: 'http://localhost:6003' // It's better to require a config file
}

Vue.use(vueConfig, configs)

Vue.use({
  install: function(Vue, name = '$axios') {
    Object.defineProperty(Vue.prototype, name, { value: axios });
  }
});

// import iView from 'iview';
// Vue.use(iView);

// import Quasar, * as Everything from 'quasar-framework'
// Vue.use(Quasar, {
//   deps: {
//     moment
//   },
//   components: Everything,
//   directives: Everything
// })
// 
Vue.prototype.$collect = collect;

Vue.prototype.$observe = function defineReactive(vm,key,val){
  if(key in vm){
    vm[key] = val
  } else {
    Vue.util.defineReactive(vm,key,val)
  }
}

Vue.filter('currency', {
  read: function (value) {
    return '฿' + value.toFixed(2)
  },
  write: function (value) {
    var number = +value.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : number
  }
})


Vue.use(ElementUI, { locale })
Vue.component('paginate', Paginate)
Vue.use(Resource)



// https://github.com/RobinCK/vue-ls
import VueLocalStorage from 'vue-ls';
// let options = {
//   namespace: 'vuejs__'
// };
// Vue.use(VueLocalStorage, options);
Vue.use(VueLocalStorage);
// https://github.com/sytelus/CryptoJS
import CryptoJs from "crypto-js";
Vue.use({
  install: function(Vue, name = '$cryptojs') {
    let b64encode = (text)=>{
      return CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(text))
    }
    let b64decode = (b64text)=> {
       return CryptoJs.enc.Utf8.stringify(CryptoJs.enc.Base64.parse(b64text));
    }
    Object.defineProperty(Vue.prototype, name, { value: CryptoJs });
    Object.defineProperty(Vue.prototype.$cryptojs, 'b64encode', { value: b64encode });
    Object.defineProperty(Vue.prototype.$cryptojs, 'b64decode', { value: b64decode });
  }
});

// https://github.com/dankogai/js-base64
import Base64  from "js-base64";
Vue.use({
  install: function(Vue, name = '$base64') {
    Object.defineProperty(Vue.prototype, name, { value: Base64.Base64 });
  }
});
// var textString = 'Hello world'; // Utf8-encoded string
// var words = CryptoJS.enc.Utf8.parse(textString); // WordArray object
// var base64 = CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='

// var base64 = 'SGVsbG8gd29ybGQ=';
// var words = CryptoJS.enc.Base64.parse(base64);
// var textString = CryptoJS.enc.Utf8.stringify(words); // 'Hello world'

// var words  = CryptoJS.enc.Base64.parse('SGVsbG8sIFdvcmxkIQ==');



// https://github.com/emn178/js-md5
import md5  from "js-md5";
Vue.use({
  install: function(Vue, name = '$md5') {
    Object.defineProperty(Vue.prototype, name, { value: md5 });
  }
});
/******
md5(''); // d41d8cd98f00b204e9800998ecf8427e
md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0

// It also supports UTF-8 encoding
md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07

// It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
md5([]); // d41d8cd98f00b204e9800998ecf8427e
md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e

// Different output
md5(''); // d41d8cd98f00b204e9800998ecf8427e
md5.hex(''); // d41d8cd98f00b204e9800998ecf8427e
md5.array(''); // [212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]
md5.digest(''); // [212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]
md5.arrayBuffer(''); // ArrayBuffer
md5.buffer(''); // ArrayBuffer, deprecated, This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
*****/

// console.log('vue-config---->',Vue.config)
var version = Vue.version
console.log('vue version is:',version)