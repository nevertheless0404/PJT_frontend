<template>
  <div class="row w-100">
    <div class="col-0 col-lg-5 row left-box p-0">
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
        style="text-align: left; font-size: calc(7px + 5vw)"
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
    <div class="signup col-12 col-lg-7 d-flex align-items-center">
      <div class="login-box w-100 d-flex flex-column align-items-center">
        <img
          v-if="login_status === 'success'"
          src="@/assets/images/rocket_1.png"
          class="rocket col-12 p-0"
          style="z-index: 2"
        />
        <img
          v-if="login_status === 'fail'"
          src="@/assets/images/boom.png"
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
        <h1 class="title d-flex flex-column align-self-start fw-bold my-5">
          Login
        </h1>
        <form
          class="w-100 d-flex flex-column align-items-center"
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
          <button type="submit" class="btn w-100 my-3 shadow btn-login">
            로그인
          </button>
          <p class="my-1">
            <a style="color: gray" :href="signupUrl">계정이 없으신가요?</a>
          </p>
          <GoogleLogin />
          <!-- 경고 메시지 출력 -->
          <b-alert
            :show="dismissCountDown"
            variant="warning"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
            v-if="err"
          >
            <p>
              {{ err }}
            </p>
            <b-progress
              variant="warning"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from '../components/GoogleLogin.vue'

let cnt = 0
export default {
  components: { GoogleLogin },
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      err: null,
      login_status: 'success',
      email: '',
      password: '',
      msg: '',
      signupUrl: '/signup'
    }
  },
  methods: {
    async handleSubmit() {
      console.log('핸들 서브밋')
      const response = await axios
        .post('api/accounts/v1/login/', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          this.$store.dispatch('user', response.data.user)
          this.$router.push('/project')
        })
        .catch((error) => {
          console.log('에러 리스폰스', error.response)
          if (error.response.status === 400) {
            this.login_status = 'fail'
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            this.err = '아이디 혹은 비밀번호를 확인해 주세요 🥹'
            this.showAlert()
            if (this.dismissSecs === 0) {
              this.login_status = 'success'
            }
          }
        })
    },
    countDownChanged(dismissCountDown) {
      cnt += 1
      this.dismissCountDown = dismissCountDown
      if (cnt > 5) {
        console.log('cnt:', cnt)
        this.login_status = 'success'
        cnt = 0
      }
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    changeLoginStatus() {
      console.log('실행')
      this.login_status = 'success'
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
  .mobile-title {
    display: contents;
  }
}

@media (min-width: 992px) {
  .mobile-title {
    visibility: hidden;
    position: absolute;
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
  margin: 0 10vw 0 10vw;
}

input {
  height: 50px;
  border-radius: 40px;
}

.rocket {
  width: 20vw;
  position: absolute;
  top: 50px;
  right: 20%;
}

.btn-login {
  font-size: 20px;
  font-weight: 600;
  background-color: rgb(45, 126, 250);
  color: white;
  border-radius: 40px;
  height: 60px;
}

.btn-login:hover {
  background-color: #2064ca;
  color: white;
  transform: scale(1.05);
  transition: 0.3s;
}
</style>
