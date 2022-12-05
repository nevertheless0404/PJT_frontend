<template>
  <div class="home d-flex flex-column align-items-center welcome-box">
    <img src="@/assets/images/logo.png" class="pjt-logo" />
    <h3 class="pjt-subtitle">P to J projecT</h3>
    <a
      :href="gotoLogin"
      class="btn w-25 my-5 shadow d-flex align-items-center justify-content-center btn-intro"
    >
      Start
    </a>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allPeopleList: [],
      gotoLogin: 'http://localhost:8080/login'
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
