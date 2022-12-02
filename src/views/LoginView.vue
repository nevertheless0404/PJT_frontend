<template>
  <div class="signup container d-flex flex-column align-items-center">
    <h1 class="title fw-bold my-5">Login</h1>
    <form
      class="w-50 d-flex flex-column align-items-center"
      @submit.prevent="onSubmit(email, password)"
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
      <!-- 결과 메시지 출력 -->
      <p>{{ msg }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    }
  },
  methods: {
    onSubmit() {
      // LOGIN 액션 실행
      this.$axios
        .post(
          'http://127.0.0.1:8000/api/accounts/v1/login/',
          { email: this.email, password: this.password },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          console.log(response)
          if (response.data.access_token) {
            localStorage.setItem('wtw-token', response.data.access_token)
          }
          if (response.data.refresh_token) {
            localStorage.setItem('wtw-ref-token', response.data.refresh_token)
          }
        })
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
