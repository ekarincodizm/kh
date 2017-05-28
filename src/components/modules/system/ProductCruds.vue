<template>
    <div id="content">
        <div class="xcrud">
                <div class="xcrud-list-container">
                    <div style="float:left;padding-left: 20px;height:40px; padding-top: 5px;">
                        <span> Filter: <input @change="filters" v-model="filtertxt" type="text" name="filter" style="width:400px" value="" placeholder="search" /></span>
                    </div>
                    <table class="xcrud-list table table-striped table-hover table-bordered">
                        <thead>
                            <tr class="xcrud-th">
                                <th class="xcrud-num">#</th>
                                <th  v-for="(col,index) in cols" class="xcrud-column xcrud-action">{{col}}</th>
                                <th class="xcrud-actions" style="width: 71px; min-width: 71px;">&nbsp;</th>
                            </tr></thead>
                        <tbody>
                            <tr class="xcrud-row xcrud-row-0" v-for="(item,index) in filters()">
                                <td class="xcrud-current xcrud-num">{{index+1}}</td>
                                <td v-for="row in item">{{row}}</td>
                                <td class="xcrud-current xcrud-actions xcrud-fix">
                                    <span>
                                        <router-link v-bind:to="'/system/product/' + index" class="xcrud-action xcrud-button xcrud-cyan"><i class="icon-info-2"></i></router-link>
                                        <router-link v-bind:to="'/system/product/edit/' + index " class="xcrud-action xcrud-button xcrud-orange"><i class="icon-pencil"></i></router-link>
                                        <a @click="delitem(item)" class="xcrud-action xcrud-button xcrud-orange"><i class="icon-remove"></i></a>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
                <div class="xcrud-nav">
                    <router-link to="/system/product/add" class="xcrud-button xcrud-orange xcrud-action"><i class="icon-plus"></i> Add</router-link>

                   <!--  <a href="javascript:;" data-task="csv" class="xcrud-button xcrud-purple xcrud-in-new-window xcrud-action">
                        <i class="icon-file"></i> Export into CSV</a>
                        <a href="javascript:;" data-task="print" class="xcrud-button xcrud-pink xcrud-in-new-window xcrud-action">
                            <i class="icon-print"></i> Print</a>
                            <button class="xcrud-search-toggle xcrud-button xcrud-cyan" @click="isSearch = !isSearch"  >Search</button><br />
                                <span v-show="isSearch" class="xcrud-search" style="display:none;">
                                    <input class="xcrud-searchdata xcrud-search-active xcrud-input-small" name="phrase" data-type="text" style="" data-fieldtype="default" type="text" value="">
                                    <select class="xcrud-daterange xcrud-searchdata xcrud-input-small" name="range" data-fieldtype="date" style="display:none">
                                        <option value="">- choose range -</option>
                                        <option value="next_year" data-from="1514764800" data-to="1546300799"> Next year</option>
                                        <option value="next_month" data-from="1496275200" data-to="1498780799"> Next month</option>
                                        <option value="today" data-from="1495584000" data-to="1495670399"> Today</option>
                                        <option value="this_week_today" data-from="1495411200" data-to="1495670399"> This week up to today</option>
                                        <option value="this_week_full" data-from="1495411200" data-to="1496015999"> This full week</option>
                                        <option value="last_week" data-from="1494806400" data-to="1495411199">  Last week</option>
                                        <option value="last_2weeks" data-from="1494201600" data-to="1494806399">  Last two weeks</option>
                                        <option value="this_month" data-from="1493596800" data-to="1495670399"> This month</option>
                                        <option value="last_month" data-from="1491004800" data-to="1495583999"> Last month</option>
                                        <option value="last_3months" data-from="1485907200" data-to="1495583999">   Last 3 months</option>
                                        <option value="last_6months" data-from="1477958400" data-to="1495583999">   Last 6 months</option>
                                        <option value="this_year" data-from="1483228800" data-to="1495670399">   This year</option>
                                        <option value="last_year" data-from="1451606400" data-to="1483228799">  Last year</option>
                                    </select>
                                    <input class="xcrud-searchdata xcrud-datepicker-from  xcrud-input-small" name="phrase][from" style="display:none" data-type="datetime" data-fieldtype="date" type="text" value="">
                                    <input class="xcrud-searchdata xcrud-datepicker-to  xcrud-input-small" name="phrase][to" style="display:none" data-type="datetime" data-fieldtype="date" type="text" value="">
                                    <select class="xcrud-data xcrud-columns-select xcrud-input-small" name="column">
                                        <option value="">
                                            All fields</option>
                                            <option value="payments.customerNumber" data-type="int">
                                                Customernumber</option>
                                                <option value="payments.checkNumber" data-type="text">
                                                    Checknumber</option>
                                                    <option value="payments.paymentDate" data-type="datetime">
                                                        Paymentdate</option>
                                                        <option value="payments.amount" data-type="float">
                                                            Amount</option>
                                                        </select>
                                                        <span class="">
                                                            <a class="xcrud-action xcrud-button xcrud-green" href="javascript:;" data-search="1">
                                                                Go</a>
                                                            </span>
                                                        </span>
                                                        <br>
                                                        <div class="btn-group xcrud-limit-buttons" style="float:left;" data-toggle="buttons-radio">
                                                            <button type="button" class="xcrud-button active xcrud-action" data-limit="10">10</button>
                                                            <button type="button" class="xcrud-button xcrud-action" data-limit="25">25</button>
                                                            <button type="button" class="xcrud-button xcrud-action" data-limit="50">50</button>
                                                            <button type="button" class="xcrud-button xcrud-action" data-limit="100">100</button>
                                                            <button type="button" class="xcrud-button xcrud-action" data-limit="all">All</button>
                                                        </div>
                                                        <div style="float: right;">
                                                            <ul class="xcrud-pagination">
                                                                <li class="active"><span>1</span></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="10">2</a></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="20">3</a></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="30">4</a></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="40">5</a></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="50">6</a></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="60">7</a></li>
                                                                <li class=""><span>…</span></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="260">27</a></li>
                                                                <li class=""><a href="javascript:;" class="xcrud-action" data-start="270">28</a></li>
                                                            </ul> -->
                                                        </div>
                                                        <br />
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
        filtertxt:'',
        isSearch: false,
        cols:  this.$store.state.productcols,
        items: this.$store.state.products
    };
  },
  methods: {
    delitem(item) {
        bootbox.confirm('ต้องการจะลบ สินค้าตัวหนีหรือไม่  ?',(result) => {
                  if(result){
                        // alert('ลยเสร็จ')
                    }
             });       
    },
    gettype(idx) {
        return this.types.find(i=i.index == idx);
    },
    filters(){
        // console.log('filtertxt=',this.filtertxt);
        if(this.filtertxt){
            return  this.items.filter(i=>i.name.toLowerCase().indexOf(this.filtertxt.toLowerCase()) >= 0 );
        } else {
            return this.items;
        }
    }
  }
};
</script>

<style lang="css" scoped></style>