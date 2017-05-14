<template id="autocomplete">
<div style="width:100%;height:35px">
      <input v-bind:list="myid"  v-model="type" style="width:100%;height:35px;font-size:25px" />
      <datalist v-bind:id="myid">
        <option v-for="p in data" v-bind:value="p.name">{{p.name}}</option>
      </datalist>
</div>
</template>

<script>
export default {
  name: 'Tlenautocomplete',
  props:['id','data'],
  data () {
    return {
       model: String,
       type: ""
    };
  },
  watch:{
    type(val,old){
      return this.$parent.$data[this.model] = val;
    }
  },
  computed:{
    myid() {
      return 'tlen'+ this.id;
    }
  },
  created(){
      this.type = this.$parent.$data[this.model];
  }
};
</script>

<style lang="css" scoped>

</style>