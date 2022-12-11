<template>
  <div class="signup container d-flex flex-column align-items-center">
    <h1 class="title fw-bold my-5">Signup</h1>
    <form
      class="w-50 d-flex flex-column align-items-center"
      @submit.prevent="submitForm"
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
          id="password1"
          placeholder="Password"
          v-model="password1"
        />
      </div>
      <div class="mb-3 w-100">
        <input
          type="password"
          class="form-control"
          id="password2"
          placeholder="Password Check"
          v-model="password2"
        />
      </div>
      <button type="submit" class="btn w-75 my-3 btn-signup">회원가입</button>
      <!-- 결과 메시지 출력 -->
      <p>{{ logMessage }}</p>
      <p v-if="errors.length > 0">
        Please correct the following error(s):
        <ul>
          <li :key="idx" v-for="(error, idx) in errors">{{ error }}</li>
        </ul>
      </p>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/api/index'

export default {
  data() {
    return {
      // form
      email: '',
      password1: '',
      password2: '',
      // log
      logMessage: '',
      errors:[]
    }
  },
  methods: {
    async submitForm() {
      this.checkForm()
      // API 요청시 전달할 userData 객체
      if(this.errors.length < 1){
        console.log('!!!!!!!!')
        const userData = {
          email: this.email,
          password1: this.password1,
          password2: this.password2
        }
        const { data } = await registerUser(userData)
        this.logMessage = `${data.email} 님이 가입되었습니다.`

        // 가입 후 폼 초기화
        this.initForm()
        this.$router.push('/login')
      }
    },
    initForm() {
      this.email = ''
      this.password1 = ''
      this.password2 = ''
    },
    checkForm() {
      console.log('체크폼 실행')
      this.errors = []
      if(this.email === ''){
        this.errors.push("Email required")
      }
      if(this.password1 === '') {
        this.errors.push("Password required")
      }
      if(this.email.split('@')[0].length < 4) {
        this.errors.push("Too short you email length. Please length +3 before '@'")
      }
      if(this.password1.length < 9) {
        this.errors.push("Too short you password length. Please password +8")
      }
      if(this.password1 != this.password2) {
        this.errors.push("Password does not matching")
      }
    }
  }
}

// export default {
//   data() {
//     return {
//       email: '',
//       password1: '',
//       password2: ''
//     }
//   },
//   methods: {
//     postData() {
//       console.log(this.email)
//       console.log(this.password1)
//       console.log(this.password2)

//       axios({
//         url: 'http://localhost:8000/api/accounts/v1/registration/', // 환경 변수로 설정해야 배포하면 편함
//         method: 'post',
//         // headers: { 'Content-Type': 'application/json' },
//         data: {
//           username: '',
//           email: this.email,
//           password1: this.password1,
//           password2: this.password2
//         }
//       })
//         .then((res) => {
//           console.log(res.staus)
//           console.log(res.data)
//           // console.log(JSON.stringify(userData))
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//         .finally(() => {
//           console.log('항상 마지막에 실행')
//         })
//     }
//   }
// }

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
</script>

<style scoped>
.title {
  text-align: center;
  font-family: 'Dela Gothic One', cursive;
}

input {
  height: 50px;
  border-radius: 40px;
}

.btn-signup {
  font-size: 20px;
  font-weight: 600;
  background-color: rgb(45, 126, 250);
  color: white;
  border-radius: 40px;
  height: 60px;
}

.btn-signup:hover {
  background-color: #2064ca;
  color: white;
  transform: scale(1.05);
  transition: 0.3s;
}
</style>
