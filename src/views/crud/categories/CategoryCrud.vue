<template>
  <div class="content-wrapper">
     <div id="content">
        <section class="noprint" style="padding-left:10px;padding-top:10px">
              <h2 class="page-header">{{header}}</h2>
              <div class="box box-default">
                  <div class="box-header with-border">
                      <i class="fa fa-warning"></i>
                      <h3 class="box-title">{{title}}</h3>
                      <div style="float:right;padding-right:20px">
                        Page:{{page}}/{{totalpage}}</div>
                  </div>
                  <div class="searchbox">
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                          <span>จำนวนแถว/หน้า:</span>
                          <select v-model="perpage" style="width:90px">
                            <option value="10">5</option>
                            <option selected value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                       </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5">
                          <span>Search:</span> 
                          <input type="text" style="width:300px" v-model="filtertxt" name="search" id="search" placeholder="ค้นหา" >
                          <a href="#" @click="filtertxt=''"><i class="glyphicon glyphicon-remove"></i></a>
                         </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                              <button style="float:right;background-color: #42b983;color: white;width: 80px;" @click="additem"><i class="glyphicon glyphicon-plus"></i>Add</button>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-1" @click="setting">
                           <i  class="glyphicon glyphicon-cog" style="cursor:pointer"></i>
                        </div>
                  </div>
                  <div class="box-body">
                      <table class="table table-bordered table-striped dataTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>picture</th>
                            <th>Name</th>
                            <th>color</th>
                            <th>ขนิด</th>
                            <th>status</th>
                            <th v-for="col in cols" v-if="col.visible" @click="sortBy(col)"
                                  :class="{ active: activeKey == col.key }" 
                                  :style="col.width !== null ? 'width:'+col.width+'px;' : ''"
                                  >
                                  {{col.label}}
                              <span v-if="col.sortable" class="arrow" :class="sortOrders[col.key]> 0 ? 'asc' : 'dsc'"></span>
                            </th>
                            <th style="width:50px" >Action</th> 
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row,idx) in showdata">
                            <td>{{idx+1}}</td>
                            <td style="text-align:center"><img v-if="row.picture" :src="'/static/img/imgtype/'+ row.picture" alt="row.picture" width="60" ></td>
                            <td style="text-align:center">{{row.name}}</td>
                            <td style="text-align:center">
                              <div v-if="row.color" 
                              :style="'height:60px;margin 0 auto;text-align:center;background-color:'+row.color+';'">&nbsp;{{row.color}}
                              </div></td>
                            <td style="text-align:center">{{filtertype(row.type)}}</td>
                            <td style="text-align:center">{{filterstatus(row.status)}}</td>
                            <td style="text-align:center">{{row.updated_by}}</td>
                            <td style="text-align:center">{{row.created_by}}</td>
                            <td style="text-align:center">{{row.created_date}}</td>
                            <td style="text-align:center">{{row.updated_date}}</td>
<!--                             <td v-for="col in cols" :class="col.classname" v-if="col.visible">{{row[col.key]}}
                            </td> -->
                            <td style="text-align:center;">
                                <div style="position:relative;white-space: nowrap;">
                                      <a href="#" @click="showinfo(row)"><i class="glyphicon glyphicon-info-sign"></i></a>
                                      <a href="#" @click="edititem(row)"><i class="glyphicon glyphicon-pencil"></i></a>
                                      <a href="#" @click="deleteitem(row)"><i class="glyphicon glyphicon-trash"></i></a>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td v-bind:colspan="colslength" class="footercol">
                               <paginate
                                ref="paginate"
                                :page-count="totalpage"
                                :click-handler="changepage"
                                :prev-text="'Prev'"
                                :next-text="'Next'"
                                :container-class="'pagination'">
                              </paginate>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                  </div>
              </div>
            <summary>&nbsp;</summary>
            <footer>&nbsp;</footer>
        </section>
        <section class="print">
          <span>print section</span>
        </section>
        </div>
    </div>

</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions  } from 'vuex'
import bootbox from '@/lib/bootbox';

export default {
  name: 'productscrud',
  data() {
  //----------------------INIT -----
          const cols = [
            { key : 'id'           , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 0, classname:'center' ,width: null, label: 'id'           },
            { key : 'name'         , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 0, classname:'left'   ,width: null, label: 'name'         },
            { key : 'status'       , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 0, classname:'left'   ,width: null, label: 'status'       },
            { key : 'type'         , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 0, classname:'left'   ,width: null, label: 'ประเภท'         },
            { key : 'picture'      , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 0, classname:'left'   ,width: null, label: 'รูปภาพ'         },
            { key : 'color'         , readonly:0, default:'',inputtype: 'text', sortable: 0, visible:0, classname:'left'   ,width: null, label: 'color'       },
            { key : 'sort'         , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 0, classname:'left'   ,width: null, label: 'sort'         },
            { key : 'updated_by'   , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 1, classname:'left'   ,width: null, label: 'updated_by'   },
            { key : 'created_by'   , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 1, classname:'left'   ,width: null, label: 'created_by'   },
            { key : 'created_date' , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 1, classname:'left'   ,width: null, label: 'created_date' },
            { key : 'updated_date' , readonly:0, default:'',inputtype: 'text', sortable: 0, visible: 1, classname:'left'   ,width: null, label: 'updated_date' },
           ];
        let sortorders = {};
        cols.forEach(function(i){
          sortorders[i.key] = 1 
        })
  //---------------------------
    return { 
        module: "Manage Products",
        header:'รายการจัดการ Categories',
        title:'รายการชนิดผลไม้',
        sortOrders:sortorders,
        money: 234,
        filtertxt: '',
        sortKey: '',
        activeKey:'',
        page:1,
        perpage:10,
        selectedcol:{},
        cols:cols,
    };
  },
  computed:{
    ...mapGetters({datas:'categories/categories'}),
    totalpage() {
       return  Math.ceil(this.filteredData.length/this.perpage);
    },
    filteredData: function () {
            var sortKey = this.sortKey
            var filtertxt = this.filtertxt && this.filtertxt.toLowerCase()
            var order = this.sortOrders[sortKey] || 1
            var data = this.datas
            if (filtertxt) {
              data = data.filter(function (row) {
                return Object.keys(row).some(function (key) {
                  return String(row[key]).toLowerCase().indexOf(filtertxt) > -1
                })
              })
            }
            if (sortKey && this.selectedcol.sortable) {
              data = data.slice().sort(function (a, b) {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * order
              })
            }
            if(typeof data == 'undefined'){
              return  []
            } else {
              return data
            }
    },
    showdata(){
         if(this.page > this.totalpage){
           this.page = 1;
           (this.$refs.paginate ? this.$refs.paginate.selected = 0 : null);
         }
         let skip = (this.page-1) * Number(this.perpage);
         let take = Number(skip) + Number(this.perpage);
         return this.filteredData.slice(skip,take);
    },
    colslength() {
        let l = this.cols.filter((i)=>i.visible).length + 3;
        console.log('sonspan =',l)
        return l;
    },
  },
  filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
  },
  methods:{
    changepage(page){this.page = page; },
    sortBy(col) {
          if(col.sortable){
            this.selectedcol = col
            this.sortKey = col.key
            this.sortOrders[col.key] = this.sortOrders[col.key] * -1
            console.log(col.key,'=',this.sortOrders[col.key]);
          }
          this.activeKey = col.key
    },
    filtertype(type) {
      if(type == 0) {
        return 'ผลไม้'
      } else if(type == 1) {
        return 'ค่าใช้จ่าย'
      } else {
        return 'อื่น ๆ'
      }
    },
    filterstatus(status){
      if(status) {
        return 'Enable'
      } else {
        return 'Disable'
      }
    },
    showinfo(row){ 
      let info = {
        title: 'รายละเอียดผลไม้',
        fields: { },
        callback: (values) => { }
      }
      this.cols.forEach((i)=>{
        let field = {};
        field['label'] = i.label
        field['type'] = i.inputtype
        field['readonly'] = 1
        field['value'] = row[i.key];
        info.fields[i.key] = field;
      })
      console.log('setting=',info)
      bootbox.form(info);
    },
    edititem(row){ console.log('edititem(row)=',row);
        let edit = {
          title: 'รายละเอียดผลไม้',
          fields: { },
          callback: (values) => { 
            if(values){
              console.log('rs=',values)
                this.cols.forEach((i)=>{
                    row[i.key] = values[i.key];
                })
            }
          }
        }
        this.cols.forEach((i)=>{
          let field = {};
          field['label'] = i.label
          field['type'] = i.inputtype
          field['value'] = row[i.key];
          field['readonly'] = i.readonly
          edit.fields[i.key] = field;
        })
        console.log('setting=',edit)
        bootbox.form(edit);
    },
    deleteitem(row){ 
        let idx = this.datas.indexOf(row);
        console.log('deleteitem(row)=',row,idx,this.datas[idx]);
        bootbox.confirm('ต้องการจะลบ<br/>'+ row.name +'<br/> y/n ?',(rs)=>{
          console.log('rs=',rs,'idx=',idx)
        });
    },
    additem() {
       console.log('additem')
       let additem = {
          title: 'รายละเอียดผลไม้',
          fields: { },
          callback: (values) => { 
            if(values){
              let date = new Date();
              let item = {};
              console.log('rs=',values)
                this.cols.forEach((i)=>{
                    item[i.key] = values[i.key];
                })
                item.id = this.datas.length+1;
                item.created_by = 'system';
                item.updated_by = 'system';
                item.created_date = date
                item.updated_date = date
                console.log('item=',item);
                this.datas.push(item);
            }
          }
        }
        this.cols.forEach((i)=>{
            let field = {};
          if(i.readonly) { 
            field['label'] = i.label
            field['type'] = 'hidden'
            field['value'] = i.default;
            field['readonly'] = i.readonly
            
          }else{
            field['label'] = i.label
            field['type'] = i.inputtype
            field['value'] = i.default;
            field['readonly'] = i.readonly
          }
            additem.fields[i.key] = field;
        })
        console.log('setting=',additem)
        bootbox.form(additem);
    },
    setting(){
                let setting = {
                title: 'Column Setting',
                fields: { },
                callback: (values) => {
                          console.log(values)
                          this.cols.forEach((i)=>{
                            i.visible = values[i.key]
                          })
                }
            }

      this.cols.forEach((i)=>{
        console.log(i)
        let field = {};
        field['label'] = i.label
        field['type'] = 'checkbox'
        field['value'] = (i.visible ? true : false )
        setting.fields[i.key] = field;
      })
      console.log('setting=',setting)
      bootbox.form(setting);
    }
  },
  created() {
        console.log('create')
  },
  mounted() {
      console.log('mounted')
  }
};
</script>

<style lang="css"  scoped>

header {
  margin: 0;
  height: 56px;
  padding: 0 0 0 24px;
  background-color: #4fc08d;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.footercol {
  width:100%
}

.searchbox {
  padding-top: 10px;
  height: 35px;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.left {
  text-align: left;
}

th, td {
  min-width: 50px;
  padding: 10px 20px;
}
th {
  text-align:center;
}

th.active {
  color: #fff;
  background-color: #42b983!important;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

.print  {
  display: none;
}

@media print {
  .noprint {
    display: none;
  }

  .print {
    display: block;
  }
}
</style>