<template>
  <div>
    <div class="container mt-4">
      <form @submit.prevent="submitMembes">
        <h3 class="title fw-bold my-5">ProjectMember</h3>
        <div class="d-flex justify-content-center">
          <div class="allmember">
            <div class="memberbox" :key="id" v-for="(member, id) in members">
              <span class="pjtmember">{{ member.user }}</span>
            </div>
          </div>
        </div>
          <router-link
              :to="{ name: 'membercreate' }"
              class="btn1"
              >
              + 팀원 추가</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { MemberList } from '@/api/index'

export default {
  data() {
    return {
      members: [
        {
          id: '',
          user: ''
        }
      ]
    }
  },
  setup() {},
  created() {
    MemberList(this.$route.params.id)
    .then((response) => {
      console.log(response.data)
      this.members = response.data
      console.log(this.members)
      .catch((error) => console.log(error))
    })
  },
  mounted() {},
  unmounted() {},
  // methods: {
  //   async submitMembers() {
  //     let stringMember = ''
  //     this.member.forEach((ele) => {
  //       stringMember += ele.user + ' '
  //     })

  //     const memberData = {
  //       id: '',
  //       user: stringMember
  //     }
  //     await MemberList(this.$route.params.id, memberData)
}
</script>
<style scoped>
.title {
  text-align: center;
  font-family: 'Dela Gothic One', cursive;
}

.memberbox{
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 1000px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: #D9D9D9 solid 2px;
}

.pjtmember {
  font-weight: bold;
  text-decoration: none;
}

.btn1 {
  margin: auto;
  color: white;
  background-color: #3485FF;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.btn1:hover {

  box-shadow: inset 300px 0px 0px 0px #FFC062;
}

.allmember{
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 300px;
}

</style>