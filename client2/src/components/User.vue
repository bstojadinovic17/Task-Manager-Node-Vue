<template>
    <div>
        <b-container>
          <b-row>
              <b-col cm="6" >
                  <b-form-input v-model="username" placeholder="Enter your username"></b-form-input>
                  <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
                  <b-button variant="primary" @click="submitUser" href="#">Submit</b-button>
              </b-col>
          </b-row>
      </b-container>
    
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'user',
    
    methods: {
        ...mapActions(['log_user']),
        submitUser: function(){
            const user = JSON.stringify({username: this.username, password: this.password});
            this.log_user(user)
            if(localStorage.length>1){
                localStorage.setItem('loggedIn', true);
                this.$router.push({ path: "/home" });
            }else{
                return;
            }

        }

        
    }
}
</script>