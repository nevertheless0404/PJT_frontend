<template>
  <div>
    <NavBar_detail />
    <div class="container mt-4">
      <h3 class="title fw-bold my-5">ProjectMember</h3>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <form @submit.prevent="postmember" class='form1 mb-5 input-wrap'>
          <div class="w-100 d-flex">
            <input @keyup="searchEmail" type="email" class="search_input" placeholder="Email" v-model="memberInput">
            <button type="submit" class="search_btn btn btn-primary">추가</button>
          </div>
          <ejs-autocomplete>
          </ejs-autocomplete>
        </form>
        <div class="allmember">
          <div class="memberbox" :key="id" v-for="(member, id) in members">
            <span class="pjtmember">{{ member.user }}</span>
            <span v-if="(member.leader===true)">팀장</span>
            <span v-if="(member.leader===false)">팀원
              <button @click="changeleader" :data-id="member.id" v-if="(user.email===teamLeader)" class="btn btn-dark">
                팀장 위임
              </button>
              <button @click="deletemember" :data-id="member.id" v-if="(user.email===teamLeader)" class="btn btn-danger">
                팀원 삭제
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
import { userList } from '@/api/index'

let search_input = document.querySelector(".search_input")
let suggestions_pannel = document.querySelector(".suggestions_pannel")
let search_btn = document.getElementById("search_btn")
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
      userList: []
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
    }),
    userList()
    .then((response) => {
      this.userList = response.data
      console.log(this.userList)
    })
  },
  mounted() {},
  unmounted() {},
  methods: {
    searchEmail() {
      if (window.event.keyCode === 13) {
        window.event.preventDefault()
        search_btn.click()
      }
      console.log(this.memberInput)
      console.log(this.userList)
      for (let i=0; i<this.userList.length; i++) {
        if (this.userList[i].email.startsWith(this.memberInput) === true) {
          let div = document.createElement('div')
          div.insertAdjacentHTML('beforeend', `<p>${this.userList[i].email}<p>`)
          console.log(div)
          suggestions_pannel.appendChild(div)
          console.log(suggestions_pannel)
        }
      }
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
  width: 80%;
}
</style>