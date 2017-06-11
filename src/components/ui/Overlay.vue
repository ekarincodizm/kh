<template>
      <div  v-on:dblclick="handleclick"  v-show="app.loading" id="overlay">
        	<div  class="timer"></div>
      </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'Overlay',
  methods: {
  	handleclick(){
  		this.app.loading = !this.app.loading;
  	}
  },
  computed : {
	...mapState(['app']),
  }
};
</script>

<style lang="css" scoped>
  #overlay {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          background: #000;
          opacity: 0.8;
          filter: alpha(opacity=80);
          display: block;
    	    z-index: 9999;
          }
      /* Timer*/
      .timer{
        z-index: 999;
        width: 29px;
        height: 29px;
        background-color: transparent;
        box-shadow: inset 0px 0px 0px 2px #fff;
        border-radius: 50%;
        position: fixed;
        top: 400px;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
       }
      .timer:after, .timer:before{
        position: absolute;
        content:"";
        background-color: #fff;
      }
      .timer:after{
        width: 11px;
        height: 2px;
        top: 13.5px;
        left: 13.5px;
        -webkit-transform-origin: 1px 1px;
           -moz-transform-origin: 1px 1px;
            transform-origin: 1px 1px;
        -webkit-animation: minhand 2s linear infinite;
           -moz-animation: minhand 2s linear infinite;
            animation: minhand 2s linear infinite;
      }
      .timer:before{
        width: 10px;
        height: 2px;
        top: 13.5px;
        left: 13.5px;
        -webkit-transform-origin: 1px 1px;
           -moz-transform-origin: 1px 1px;
            transform-origin: 1px 1px;
        -webkit-animation: hrhand 8s linear infinite;
           -moz-animation: hrhand 8s linear infinite;
            animation: hrhand 8s linear infinite;
      }

      @-webkit-keyframes minhand{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(360deg)}
      }
      @-moz-keyframes minhand{
        0%{-moz-transform:rotate(0deg)}
        100%{-moz-transform:rotate(360deg)}
      }
      @keyframes minhand{
        0%{transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
      }

      @-webkit-keyframes hrhand{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(360deg)}
      }
      @-moz-keyframes hrhand{
        0%{-moz-transform:rotate(0deg)}
        100%{-moz-transform:rotate(360deg)}
      }
      @keyframes hrhand{
        0%{transform:rotate(0deg)}
        100%{transform:rotate(360deg)}
      }


      .box {
        width: 300px;
        height: 100px;
        background: yellow;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
      }
</style>