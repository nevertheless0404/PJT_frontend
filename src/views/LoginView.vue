<template>
  <div class="row w-100">
    <div class="col-0 col-lg-6 row left-box p-0">
      <h1
        class="title ms-5 mt-5"
        style="text-align: left; font-size: calc(3px + 4vw)"
      >
        Do you <br />
        want to be
        <span style="color: #ffc062; font-family: 'Dela Gothic One', cursive"
          >J</span
        >?
      </h1>
      <img
        src="@/assets/images/person_3.png"
        class="col-12 p-0"
        style="z-index: 2"
      />
      <h1
        class="title bottom-title ms-5 mb-5"
        style="text-align: left; font-size: calc(7px + 6vw)"
      >
        Let's
        <span style="color: #3485ff; font-family: 'Dela Gothic One', cursive"
          >P</span
        >
        <span style="color: #ffc062; font-family: 'Dela Gothic One', cursive"
          >J</span
        >
        <span style="color: #f24e1e; font-family: 'Dela Gothic One', cursive"
          >T</span
        >
        !
      </h1>
    </div>
    <div class="signup col-12 col-lg-6 d-flex align-items-center">
      <div class="login-box w-100">
        <img
          src="@/assets/images/rocket_1.png"
          class="rocket col-12 p-0"
          style="z-index: 2"
        />
        <h1
          class="title mobile-title d-flex justify-content-center"
          style="font-size: calc(7px + 6vw)"
        >
          <span style="color: #3485ff; font-family: 'Dela Gothic One', cursive"
            >P</span
          >
          <span style="color: #ffc062; font-family: 'Dela Gothic One', cursive"
            >J</span
          >
          <span style="color: #f24e1e; font-family: 'Dela Gothic One', cursive"
            >T</span
          >
        </h1>
        <h1 class="title login-title fw-bold my-5">Login</h1>
        <form
          class="w-100 d-flex flex-column align-items-center"
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
            class="btn w-100 my-3 shadow"
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
          <p class="my-1">
            <a style="text-decoration: none; color: gray" :href="signupUrl"
              >계정이 없으신가요?</a
            >
          </p>

          <!-- 결과 메시지 출력 -->
          <p>{{ msg }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      msg: '',
      signupUrl: 'http://localhost:8080/signup'
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
@media (max-width: 992px) {
  .rocket {
    visibility: hidden;
  }
  .left-box {
    visibility: hidden;
    position: absolute;
  }
  .login-title {
    display: flex;
    justify-content: center;
  }
  .mobile-title {
    display: contents;
  }
}

@media (min-width: 992px) {
  .mobile-title {
    visibility: hidden;
    position: absolute;
  }
  .login-title {
    display: flex;
    justify-content: start;
  }
}
.title {
  text-align: center;
  font-family: 'Dela Gothic One', cursive;
}

.left-box {
  background-color: #eef0f3;
}

.bottom-title {
  z-index: 1;
  position: relative;
  top: -10%;
}

.login-box {
  margin: 0 80px 0 80px;
}

.rocket {
  width: 300px;
  position: absolute;
  top: 20%;
  right: 10%;
}
</style>
