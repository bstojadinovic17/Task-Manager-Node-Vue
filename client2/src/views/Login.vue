<template>
    <div class="login">
  <b-jumbotron header="TO-DO list app" lead="Simple web app for managing to-do tasks">
    <p>Login:</p>
    <User/>
    
  </b-jumbotron>
</div>
</template>

<script>

import User from "@/components/User";

export default {
  name: 'login',
  components: {
      User
  }

}
</script>
