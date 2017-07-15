<template>
<div id="content">
    <div class="xcrud-container">
            <div class="xcrud-view">
                <table class="xcrud-details-table">
                    <thead>
                        <tr class="xcrud-th">
                            <th style="text-align:right;" class="xcrud-column">Column:</th>
                            <th style="text-align:left;padding-left:15px;">Value:<span style="float:right">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-show="canShow(index)"   v-for="(value,key,index) in item">
                            <td>{{key}}{{index}}</td>
                            <td style="text-align:left;">
                                <input class="xcrud-input" type="text" v-model="item[key]" >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <footer style="float:left;padding-left:20px;" >
                    <router-link to="/system/product/add" class="btn">Save &amp; New</router-link>
                    <router-link to="#" class="btn">Save &amp; Edit</router-link>
                    <router-link to="/system/product/list" class="btn">Save &amp; Return</router-link>
                    <router-link to="/system/product/list" class="btn">Return</router-link>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SimpleCrud',
  data () {
    return {
        shows:[1,2,4,8],
        cols :this.$store.state.productcols,
        item: this.$store.state.products[this.$route.params.id]
    };
  },
  methods:{
    chkinfo(){
        alert(JSON.stringify(this.item));
    },
    canShow(idx) {
        return this.shows.find(i=>i==idx);
    }
  }
};
</script>

<style lang="css" scoped>
 * {
    font-size:16px !important;
   }


</style>