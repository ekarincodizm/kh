<template>
  <div id="app" class="wrapper">
    <router-view></router-view>
  	<overay/>
  </div>
</template>

<script>
import overay from './components/ui/Overlay.vue'

import { mapState } from 'vuex'
export default {
  name: 'App',
  computed : {
		...mapState(['app']),
  },
  components :{
  	overay
  }
}
</script>
