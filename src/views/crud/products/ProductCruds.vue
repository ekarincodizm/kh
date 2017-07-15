<template>
<div class="content">
    <div class="row">
        <div class="box">
            <div class="box-body">

                <v-client-table :data="showentries" :columns="columns" :options="options" ></v-client-table>
  <!--               <div id="example1_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="dataTables_length" id="example1_length">
                                <label>Show
                                    <select name="example1_length" v-model="showrows" aria-controls="example1" class="form-control input-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> {{showrows}} entries</label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div id="example1_filter" class="dataTables_filter">
                                <label>Search:
                                    <input type="search"  v-model="search"  class="form-control input-sm" placeholder="" aria-controls="example1" autocomplete="off">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <table id="example1" class="table table-bordered table-striped table-hover dataTable" role="grid" aria-describedby="example1_info">
                                <thead>
                                    <tr role="row">
                                         <th>#</th>
                                            <th v-for="col in cols">{{col}}</th>
                                            <th>shortcode</th>
                                            <th>number</th>
                                            <th>product_type</th>
                                            <th>status</th>
                                            <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr role="row" v-for="(item,index) in showentries"  v-on:dblclick="editproduct(item)">
                                        <td>{{item.id}}</td>
                                        <td>{{item.product_code}}</td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.pricex}}</td>
                                        <td>{{item.category_id}}</td>
                                        <td>{{item.description}}</td>
                                        <td>{{item.shortcode}}</td>
                                        <td>{{item.number}}</td>
                                        <td>{{item.product_type}}</td>
                                        <td>{{item.status}}</td>
                                        <td style="width:100px">
                                            <div style="position:relative;white-space: nowrap;">
                                                <router-link style="padding:0px;" v-bind:to="'/system/product/' + item.id" class="btn"><i class="glyphicon glyphicon-info-sign"></i></router-link>
                                                <router-link style="padding:0px;" v-bind:to="'/system/product/edit/' + index " class="btn"><i class="glyphicon glyphicon-pencil"></i></router-link>
                                                <a           style="padding:0px;" @click="delitem(item)" class="btn"><i class="glyphicon glyphicon-trash"></i></a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr><th>#</th>
                                        <th v-for="col in cols">{{col}}</th>
                                        <th>shortcode</th>
                                        <th>number</th>
                                        <th>product_type</th>
                                        <th>status</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                </div>
                <div class="row" style="padding-left: 40px">
                    <router-link to="/system/product/add" class="btn btn-primary"><i class="icon-plus"></i> Add</router-link>
                </div> -->
            </div>
            <!-- /.box-body -->
        </div>
    </div>

</div>
</template>

<script>
import bootbox from 'bootbox'
export default {
  types:['ผลไม้','ค่าใช้จ่าย'],
  name: 'SimpleCrud',
  data () {
    return { 
        search:this.$store.state.search,
        isSearch: false,
        columns: ['id',
'product_code',
'name',
'pricex',
'actived',
'description',
'number',
'product_type',
'weight',
'shortcode',
'status',
'category_id',
'created_by',
'updated_by',
'created_date',
'updated_date',],
        options: {
            sortable: ['id','name','description','shortcode','product_code','status']
        },
        cols:  this.$store.state.productcols,
        items: this.$store.state.products,
        showrows: 10,
    };
  },
  computed:{
    showentries() {
        return this.items;
        // let show = Number(this.showrows);
        // let entries = this.items.filter(i=>i.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 );
        // return entries.slice(0,show);
    }
  },
  methods: {
    delitem(item) {

        bootbox.confirm('ต้องการจะลบ สินค้าตัวหนีหรือไม่<b>'+ item.name +'</b>  ?',(result) => {
                  if(result){
                        // alert('ลยเสร็จ')
                    }
             });       
    },
    gettype(idx) {
        return this.types.find(i=i.index == idx);
    },
    editproduct(product) {
        console.log('product=',product)
        this.$router.push("/system/product/edit/1") 
        // bootbox.alert(JSON.stringify(product));
    }
  }
};
</script>
<style lang="css" scoped>
    .table-hover tbody tr:hover td {
    background: aqua;
}
</style>