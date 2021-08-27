<template>
    <div>
      <Logged/>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Task Manager</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/home">Home</b-nav-item>
        <b-nav-item @click="LoggedOut">Logout</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
      <b-nav-item to="/new">New Task</b-nav-item>
               
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import router from "@/router";
import Logged from "@/components/Logged"

export default {
    name: 'header',
    components: {
      Logged
    },
    methods: {
      LoggedOut() {
          localStorage.clear();
          localStorage.setItem("loggedIn", false);
          this.$router.push({ path: "/" });
      }
    }
}
</script>