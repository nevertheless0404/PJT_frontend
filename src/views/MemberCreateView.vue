<template>
  <div>
    <ProjectIndexNav />
    {{ this.members }}
    <div class="container mt-4">
      <form @submit.prevent="submitMember">
        <div>
          <div class="d-flex justify-content-between">
            <label for="exampleInputEmail1" class="form-label"
              >프로젝트 팀원</label
            >
            <div class="d-flex mb-2">
              <div id="emailHelp" class="form-text me-2">
                <b-button size="sm" variant="outline-primary" @click="addMember"
                  ><i class="bi bi-plus-lg"></i> 추가</b-button
                >
              </div>
              <div id="emailHelp" class="form-text">
                <b-button
                  size="sm"
                  variant="outline-danger"
                  @click="removeMember"
                  ><i class="bi bi-dash-lg"></i> 삭제</b-button
                >
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
        <button type="submit" class="btn btn-primary">다음</button>
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

<style scoped></style>
