<template>
  <div>
    <NavBar_detail />
    <div class="container mt-4">
      <h3 class="title fw-bold my-5">ProjectMember</h3>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <form @submit.prevent="postmember" class='form1 mb-5 input-wrap'>
          <div class="w-100 d-flex">
            <input @keyup="searchEmail" type="email" class="search_input" placeholder="Email" v-model="memberInput" autocomplete="off">
            <button type="submit" class="search_btn">추가</button>
          </div>
          <div id="suggestions_pannel" v-for="(user, idx) in userList" :key="idx">
            <p @click="updateInput(user.email)">{{user.email}}</p>
          </div>
        </form>
        <div class="allmember">
          <div class="memberbox" :key="id" v-for="(member, id) in members">
            <span class="pjtmember">{{ member.user }}</span>
            <div class="member">
              <span v-if="(member.leader===true)">팀장</span>
              <span v-if="(member.leader===false)">팀원
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavBar_detail from '@/components/NavBar_detail.vue'
import { MemberList } from '@/api/index'
import { changeLeader } from '@/api/index'
import { deleteMember } from '@/api/index'
import { memberCreate } from '@/api/index'
import { searchEmail } from '@/api/index'

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
      teamLeader: '',
      userList: [],
      memberInput: ''
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
    updateInput(email) {
      this.memberInput = email
      this.userList = []
    },
    async searchEmail() {
      let memberInputSubmit = this.memberInput
      await searchEmail(memberInputSubmit)
      .then((response) => {
        this.userList = response.data
      })
    },
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
  overflow: auto;
}

.pjtmember {
  font-weight: bold;
  text-decoration: none;
}

.member{
  margin-top: 2px;
}

.search_btn{
  margin-left: 7px;
  color: white;
  background-color: #3485FF;
  width: 75px;
  height: 40px;
  border-radius: 10px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.seach_btn{
  box-shadow: inset 300px 0px 0px 0px #FFC062;
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

.btn2 {
  margin-left: 1px;
  color: white;
  background-color: #990101;
  font-size: 12px;
  height: 30px;
  border-radius: 10px;
  border: #D9D9D9 solid 1px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.btn2:hover {
  box-shadow: inset 300px 0px 0px 0px #FFC062;
}

.btn3 {
  margin: auto;
  color: white;
  background-color: #434343;
  font-size: 12px;
  height: 30px;
  border-radius: 10px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.btn3:hover {
  box-shadow: inset 300px 0px 0px 0px #FFC062;
}
.allmember{
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
}

.search_input {
    width: 100%;
    height: 42px;
    font-size: 16px;
    color: #777;
    line-height: 40px;
    border: none;
    border-bottom: 1px solid #bcbcbc;
    background: none;
}

.case_search_btn {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    margin-left: 16px;
}

.suggestions {
    border-top: 0.5px solid;
}
.suggestions > div {
    padding: 5px;
    border-top: 1px solid #888;
    cursor: pointer;
}
.suggestions > div:hover {
    background-color: rgb(207, 204, 204);
}
</style>