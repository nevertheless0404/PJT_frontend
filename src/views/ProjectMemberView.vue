<template>
  <div>
    <NavBar_detail />
    <div class="container mt-4">
      <h3 class="title fw-bold my-5">ProjectMember</h3>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <form @submit.prevent="postmember" class='form1 mb-5'>
          <div class="w-100 d-flex">
            <input type="email" class="form-control" placeholder="Email" v-model="memberInput">
            <button type="submit" class="btn4">추가</button>
          </div>
        </form>
        <div class="allmember">
          <div class="memberbox" :key="id" v-for="(member, id) in members">
            <span class="pjtmember">{{ member.user }}</span>
            <span v-if="(member.leader===true)"> 팀장</span>
            <span v-if="(member.leader===false)"> 팀원
              <button @click="deletemember" :data-id="member.id" v-if="(user.email===teamLeader)" class="btn2 float-end">
                팀원 삭제
              </button>
              <button @click="changeleader" :data-id="member.id" v-if="(user.email===teamLeader)" class="btn3 float-end">
                팀장 위임
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavBar_detail from '@/components/NavBar_detail.vue'
import { MemberList } from '@/api/index'
import { changeLeader } from '@/api/index'
import { deleteMember } from '@/api/index'
import { memberCreate } from '@/api/index'

export default {
  components: { NavBar_detail },
  data() {
    return {
      members: [
        {
          id: '',
          user: '',
          leader: false
        }
      ],
      teamLeader: ''
    }
  },
  setup() {},
  created() {
    MemberList(this.$route.params.id)
    .then((response) => {
      this.members = response.data
      for (let i=0; i<response.data.length; i++) {
        if (response.data[i].leader == true) {
          this.teamLeader = response.data[i].user
        }
      }
    })
  },
  mounted() {},
  unmounted() {},
  methods: {
    async changeleader() {
      const meberId = event.target.getAttribute('data-id')
      await changeLeader(this.$route.params.id, meberId)
      MemberList(this.$route.params.id)
      .then((response) => {
        this.members = response.data
        for (let i=0; i<response.data.length; i++) {
          if (response.data[i].leader == true) {
            this.teamLeader = response.data[i].user
          }
        }
      })
    },
    async deletemember() {
      const meberId = event.target.getAttribute('data-id')
      await deleteMember(this.$route.params.id, meberId)
      MemberList(this.$route.params.id)
      .then((response) => {
        this.members = response.data
        for (let i=0; i<response.data.length; i++) {
          if (response.data[i].leader == true) {
            this.teamLeader = response.data[i].user
          }
        }
      })
    },
    async postmember() {
      console.log(this.memberInput)
      await memberCreate(this.$route.params.id, {user:this.memberInput})
      MemberList(this.$route.params.id)
      .then((response) => {
        this.members = response.data
        for (let i=0; i<response.data.length; i++) {
          if (response.data[i].leader == true) {
            this.teamLeader = response.data[i].user
          }
        }
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
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
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  border: #D9D9D9 solid 1px;
}

.pjtmember {
  font-weight: bold;
  text-decoration: none;
}

.btn1 {
  margin: auto;
  color: white;
  background-color: #3485ff;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
}

.btn1:hover {
  box-shadow: inset 300px 0px 0px 0px #FFC062;
}

.allmember{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
}

.btn2{
  color: white;
  background-color: #e34444;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 75px;
  height: 30px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
}
.btn2:hover {
  box-shadow: inset 300px 0px 0px 0px #FFC062;
}


.btn3{
  color: white;
  margin-right: 8px;
  background-color: #383838;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 75px;
  height: 30px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
}

.btn3:hover {
  box-shadow: inset 300px 0px 0px 0px #FFC062;
}

.btn4 {
  margin-left: 10px;
  color: white;
  margin-right: 8px;
  background-color: #3485FF;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 75px;
  height: 50px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
}

.btn4:hover {
  box-shadow: inset 300px 0px 0px 0px #FFC062;
}


</style>