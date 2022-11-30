<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button v-on:click="getMultiData">get data</button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allPeopleList: []
    }
  },
  created() {
    this.getMultiData()
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
