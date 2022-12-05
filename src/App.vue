<template>
  <div id="app">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  async created() {
    console.log(localStorage.getItem('access_token'))
    const response = await axios.get('user/', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    this.$store.dispatch('user', response.data)
  }
}
</script>
<style>
* {
  font-family: 'Noto Sans KR', sans-serif;
  font-family: 'Montserrat', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
