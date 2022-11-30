<template>
  <div class="signup container d-flex flex-column align-items-center">
    <h1 class="title fw-bold my-5">Signup</h1>
    <form class="w-50">
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="E-mail"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        class="btn w-75 my-3"
        style="
          font-size: 20px;
          font-weight: 600;
          background-color: rgb(45, 126, 250);
          color: white;
          border-radius: 40px;
          height: 60px;
        "
        v-on:click="postData"
      >
        회원가입
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    postData() {
      // const userData = {}
      // userData.email = document.getElementById('exampleInputEmail1').value
      // userData.password = document.getElementById('exampleInputPassword1').value
      // console.log(userData)
      // this.$axios
      //   .post(
      //     'http://127.0.0.1:8000/accounts/register/',
      //     JSON.stringify(userData),
      //     {
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     }
      //   )
      axios({
        url: 'http://127.0.0.1:8000/accounts/register/',
        method: 'post',
        data: JSON.stringify({
          email: document.getElementById('exampleInputEmail1').value,
          password: document.getElementById('exampleInputPassword1').value
        })
      })
        .then((res) => {
          console.log(res.staus)
          console.log(res.data)
          // console.log(JSON.stringify(userData))
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          console.log('항상 마지막에 실행')
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
