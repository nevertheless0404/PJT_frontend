<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button v-on:click="getMultiData">get data</button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h3 v-if="user">hi, {{ user.email }}</h3>
    <h3 v-if="!user">not logged</h3>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async getMultiData() {
      try {
        this.allPeopleList = await axios
          .get('https://jsonplaceholder.typicode.com/users/')
          .then((res) => {
            console.log(res.staus)
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            console.log('항상 마지막에 실행')
          })
        console.log(this.allPeopleList)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style scoped>
* {
  font-family: 'Dela Gothic One', cursive;
}

.pjt-logo {
  width: 50vw;
}

.pjt-subtitle {
  font-size: calc(3px + 6vw);
}
.welcome-box {
  margin-top: 25vh;
}

.btn-intro {
  font-size: 20px;
  font-weight: 600;
  background-color: rgb(45, 126, 250);
  color: white;
  border-radius: 40px;
  height: 60px;
  min-width: 200px;
}
.btn-intro:hover {
  background-color: #2064ca;
  color: white;
  transform: scale(1.05);
  transition: 0.3s;
}
</style>
