<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
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
  </div>
</template>

<script>
import { alert } from 'vue-strap'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
