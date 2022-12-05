<template>
  <div class="signup container d-flex flex-column align-items-center">
    <h1 class="title fw-bold my-5">Login</h1>
    <form
      class="w-50 d-flex flex-column align-items-center"
      @submit.prevent="handleSubmit"
    >
      <div class="mb-3 w-100">
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="E-mail"
          v-model="email"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3 w-100">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="btn w-50 my-3"
        style="
          font-size: 20px;
          font-weight: 600;
          background-color: rgb(45, 126, 250);
          color: white;
          border-radius: 40px;
          height: 60px;
        "
      >
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
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      const response = await axios.post('login/', {
        email: this.email,
        password: this.password
      })
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      this.$store.dispatch('user', response.data.user)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-family: 'Dela Gothic One', cursive;
}
</style>
