<template>
 <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        XX管理系统
        <small>Version 2.0</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="glyphicon glyphicon-home"></i> 主页</a></li>
        <!--<li class="active">Dashboard</li>-->
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <h4 class="text-center">
        您好，张三
      </h4>
      <h2 class="text-center">
        welcome
      </h2>
    </section>
    <section class="content">
        <Table height="200" :columns="columns1" :data="data2"></Table>
        <Rate v-model="value"></Rate>
        <Row>
          <Col span="12">
              <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
          </Col>
          <Col span="12">
              <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
          </Col>
      </Row>
        <q-datetime
        v-model="model"
        type="datetime"
        ></q-datetime>

         <button class="btn btn-danger btn-lg"
          @click="showTop = !showTop">
          Click to toggle alert on top
        </button>

        <alert v-model="showTop" placement="top" duration="3000" type="danger" width="400px" dismissable>
          <span class="icon-info-circled alert-icon-float-left"></span>
          <strong>Heads up!</strong>
          <p>This alert needs your attention.</p>
        </alert>

        <el-button @click="visible = true">Button</el-button>
        <el-dialog v-model="visible" title="Hello world">
        <p>Try Element</p>
        </el-dialog>
    </section>
  </div>
 
</template>

<script>
import { alert } from 'vue-strap'

export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value:0,
      visible: false,
      showTop: true,
      columns1:[
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
      data2: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    },
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
    }
  },
  components: {
    alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>