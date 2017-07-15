<template>
<div id="content">
    <div class="xcrud-container">
            <div class="xcrud-view">
                <table  class="xcrud-details-table">
                    <thead>
                        <tr class="xcrud-th">
                            <th style="text-align:right;" class="xcrud-column">Column:</th>
                            <th style="text-align:left;padding-left:15px;">Value:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-show="canShow(index)" v-for="(value,key,index) in item" >
                            <td >{{key}}</td>
                            <td style="text-align:left;">
                                <input class="xcrud-input" type="text" v-model="item[key]">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <footer style="float:left;padding-left:20px;">
                <a  @click="savenew" class="btn btn-success">Save &amp; New</a>
                <router-link to="#" class="btn btn-primary">Save &amp; Edit</router-link>
                <router-link to="/system/product/list" class="btn btn-primary">Save &amp; Return</router-link>
                <router-link to="/system/product/list" class="btn btn-primary">Back</router-link>
            </footer>
    </div>
    <br/>
    <br/>
    <br/>
</div>
</template>

<script>
export default {
  name: 'SimpleCrud',
  data () {
    return {
        shows:[1,2,4,8],
        item: {
            "id":-1,
            "name":'',
            "pricex":'',
            "product_type":'',
            "product_code":'',
            "category_id":'',
            "status":'',
            "actived":'',
            "description":'',
            }
    };
  },
  methods: {
    chkinfo(){
        alert(JSON.stringify(this.item))
    },
    canShow(idx){
        return this.shows.find(i=>i==idx)
    },
    savenew(){
        this.item = {
            "id":-1,
            "name":'',
            "pricex":'',
            "product_type":'',
            "product_code":'',
            "category_id":'',
            "status":'',
            "actived":'',
            "description":'',
            }
    },
  }
};
</script>

<style lang="css" scoped></style>