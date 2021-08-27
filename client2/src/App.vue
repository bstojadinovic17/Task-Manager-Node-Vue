<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { mapActions} from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['load_tasks', 'load_comments', 'load_users'])
  },
  mounted: function(){
    this.load_tasks();
    this.load_comments();
    this.load_users();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
