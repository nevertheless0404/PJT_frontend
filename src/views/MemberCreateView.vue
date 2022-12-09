<template>
  <div>
    <ProjectIndexNav />
    <div class="container mt-4">
      <form @submit.prevent="submitMember" class='form1'>
        <div>
          <div class="d-flex justify-content-between">
            <label for="exampleInputEmail1" class="form-label"
              >프로젝트 팀원</label
            >
            <div class="d-flex mb-2">
              <div id="emailHelp" class="form-text me-2">
                <div class="btn2" @click="addMember"
                  ><i class="bi bi-plus-lg"></i> 추가</div>
              </div>
              <div id="emailHelp" class="form-text">
                <div class="btn3" @click="removeMember"
                  ><i class="bi bi-dash-lg"></i> 삭제</div>              
              </div>
            </div>
          </div>
          <input
            type="email"
            class="form-control mb-3"
            id="exampleInputEmail1"
            placeholder="Email"
            aria-describedby="emailHelp"
            v-model="member.user"
            :key="id"
            v-for="(member, id) in members"
          />
        </div>
        <div class='btn1box'>
          <button type="submit" class="btn1">다음</button>
        </div>
      </form>
      <!-- <div v-html="memberHtml" v-if="isCreate" class="mb-3"></div> -->
    </div>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
import { memberCreate } from '@/api/index'
export default {
  components: { ProjectIndexNav },
  data() {
    return {
      // project: [
      //   {
      //     id: ''
      //   }
      // ],
      members: [
        {
          id: this.$route.params.id,
          user: ''
        }
      ]
    }
  },
  setup() {},
  created() {
    // projectPk() // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
    //   .then((response) => {
    //     console.log(response)
    //     this.project = response.data.id
    //   }) // 성공하면 json 객체를 받아온다.
    //   .catch((error) => console.log(error))
  },
  mounted() {},
  unmounted() {},
  methods: {
    async submitMember() {
      // API 요청시 전달할 userData 객체
      let stringMember = ''
      this.members.forEach((ele) => {
        stringMember += ele.user + ' '
      })
      const memberData = {
        id: '',
        user: stringMember
      }
      memberData.id = this.$route.params.id
      console.log(memberData.id)
      await memberCreate(memberData)
      this.$router.push({ name: 'projectdetail', params: memberData.id })
    },
    addMember() {
      this.members.push({
        user: ''
      })
      console.log(this.members)
    },
    removeMember() {
      if (this.members.length > 1) {
        this.members.splice(-1, 1)
      } else {
        this.members.splice(-1, 1)
        this.addMember()
      }
      console.log(this.members)
    }
  }
}
</script>

<style scoped>

.form1 {
}
.btn1box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.btn1 {
  color: white;
  background-color: #3485FF;
  box-shadow: 5px 9px 16px 0px #0d224216;
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
  color: white;
  background-color: #3485FF;
  width: 70px;
  height: 31px;
  border-radius: 3px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.2s cubic-bezier(.5, .24, 0, 1)
}

.btn2:hover {

  box-shadow: inset 70px 0px 0px 0px #FFC062;
}


.btn3 {
  color: white;
  background-color: #F24E1E;
  box-shadow: 5px 9px 16px 0px #F24E1E;
  width: 70px;
  height: 31px;
  border-radius: 3px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.2s cubic-bezier(.5, .24, 0, 1)
}

.btn3:hover {

  box-shadow: inset 300px 0px 0px 0px #FFC062;
}

</style>
