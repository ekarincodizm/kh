<template>
  <div class="content-wrapper">
     <div id="content">
            <header>
                <span>{{module}}</span>
            </header> 
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  name: 'SimpleCrud',
  data () {
    return { 
        module: "Manage Products"
    };
  }
};
</script>

<style lang="css"  scoped>
    
header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
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

</style>