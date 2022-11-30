<template>
  <div class="login container d-flex flex-column align-items-center">
    <h1>Login</h1>
    <form class="w-50">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary" v-on:click="getMultiData">
        로그인
      </button>
    </form>
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
