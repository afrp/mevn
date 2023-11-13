<template>
  <v-app>
    <default-bar v-if="exceptPage" />

    <default-view />
  </v-app>
</template>

<script>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'

export default {
  name: 'DefaultLayout',
  components:{
    DefaultBar,
    DefaultView
  },
  computed:{
    exceptPage(){
      if (this.$route.name === 'Login' || this.$route.name === 'Register'){
        return false
      } else {
        return true
      }
    }
  },
}
</script>
