<template>
  <v-app-bar height="auto">
    <div class="bar-container">
      <div class="bar-wrap">
        <v-img class="bar-img" src="@/assets/logo.svg" />        
      </div>      
      <div class="bar-wrap">
        <div class="bar-name">
          {{name}}
        </div>
        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ props }">            
            <div class="bar-profile" role="button" v-bind="props">
              <v-img class="bar-profile-img" src="/img/Profile-Picture.png" />
            </div>
          </template>
          <v-list>
            <v-list-item              
              link
            >
              <v-list-item-title @click="logout">
                Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>        
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import axios from 'axios'
// import { mapState } from 'pinia'
import { useAppStore } from '../../store/app'
const store = useAppStore()

export default {
    name: 'appBar',
    data() {  
          return {       
            name: '',
            email: '',   
          }
    },
    created() {
      //user is not authorized
      if (localStorage.getItem('token') === null) {
        this.$router.push('/login');
      }
    },
    mounted() {
      axios.get('http://localhost:8000/user', { headers: { token: localStorage.getItem('token')}})
        .then(res => {
          this.name = res.data.user.name;
          this.email = res.data.user.email;
          store.user = res.data.user;
        }, err => {
            console.log(err.response);
            this.$router.push('/login');
        })
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/login');
      }
    }
  
}
</script>

<style lang="scss" scoped>
.bar-container{
  padding: 15px 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.bar-wrap{
  display: flex;
  align-items: center;
  gap: 25px;  
}
.bar-img{
  width: 60px;
  height: 60px;
  max-height: 60px;
  max-width: 60px;
}

.bar-name{      
  font: normal normal bold 24px/33px Open Sans;
  color: #888FB0;
  text-transform: capitalize;
}
.bar-profile{
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}
.bar-profile-img{
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 1023px) {
  .bar-container{
    padding: 15px 16px;
  }  
  .bar-img{
    width: 40px;
    height: 40px;
    max-height: 40px;
    max-width: 40px;
  }
}
</style>
