<template>
  <div>
    <NavProject />
    <div v-if="this.$router" class="container">
      <form @submit.prevent="putpjt">
        <div class="mt-5 mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >프로젝트 제목</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="PJT 프로젝트"
            v-model="title"
          />
        </div>
        <div class="mb-3">
          <label for="example-datepicker">프로젝트 시작일</label>
          <b-form-datepicker
            id="example-datepicker"
            v-model="start_at"
            :max="end_at"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <div class="mb-3">
          <label for="example-datepicker2">프로젝트 종료일</label>
          <b-form-datepicker
            id="example-datepicker2"
            v-model="end_at"
            :min="start_at"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >프로젝트 목표</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="PJT"
            v-model="goal"
          />
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label for="exampleFormControlInput1" class="form-label"
              >사용 언어 / 개발 환경</label
            >
            <div class="d-flex mb-2">
              <div id="exampleFormControlInput1" class="me-2">
                <div class="btn2" @click="addSkill"
                  ><i class="bi bi-plus-lg"></i> 추가</div>
              </div>
              <div id="exampleFormControlInput1" class="">
                <div class="btn3"
                  @click="removeSkill"
                  ><i class="bi bi-dash-lg"></i> 삭제</div>
              </div>
            </div>
          </div>
          <input
            type="text"
            class="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Tech stack"
            v-model="s.name"
            :key="id"
            v-for="(s, id) in skill"
          />
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label for="exampleInputEmail1" class="form-label">주요 기능</label>
            <div class="d-flex mb-2">
              <div id="emailHelp" class="me-2">
                <div class="btn2" @click="addfunc"
                  ><i class="bi bi-plus-lg"></i> 추가</div
                >
              </div>
              <div id="emailHelp" class="">
                <div class="btn3" @click="removefunc"
                  ><i class="bi bi-dash-lg"></i> 삭제</div
                >
              </div>
            </div>
          </div>
          <input
            type="text"
            class="form-control mb-3"
            id="exampleInputEmail1"
            placeholder="Functions"
            aria-describedby="emailHelp"
            v-model="func.content"
            :key="id"
            v-for="(func, id) in functions"
          />
        </div>
        <div class='btn1box'>
          <button @click="deleteProject" class="btn-delete mb-5">프로젝트 삭제</button>
          <button type="submit" class="btn1 ms-3 mb-5">수정</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { projectGet } from '@/api/index'
import { projectUpdate } from '@/api/index'
import { projectDelete } from '@/api/index'
import { mapGetters } from 'vuex'
import NavProject from '@/components/NavBar_detail.vue'
export default {
  components: { NavProject },
  created() {
    projectGet(this.$route.params.id).then((response) => {
      this.title = response.data.title
      this.start_at = response.data.start_at
      this.end_at = response.data.end_at
      this.goal = response.data.goal
      for (const resSkill of response.data.skill.split(' ')) {
        this.skill.push({name: resSkill})
      }
      for (const resFunctions of response.data.functions.split(' ')) {
        this.functions.push({content: resFunctions})
      }
    })
  },
  data() {
    return {
      title: "",
      start_at: "",
      end_at: "",
      goal: "",
      skill: [],
      functions: [],
      pjtPk: this.$route.params.id
    }
  },
  methods: {
    async deleteProject() {
      await projectDelete(this.$route.params.id)
      this.$router.push({ name: 'projectindex' })
    },
    async putpjt() {
      // API 요청시 전달할 ProjectData 객체
      let stringSkill = ''
      this.skill.forEach((ele) => {
        stringSkill += ele.name + ' '
      })
      let stringFunction = ''
      this.functions.forEach((ele) => {
        stringFunction += ele.content + ' '
      })
      const projectData = {
        title: this.title,
        start_at: this.start_at,
        end_at: this.end_at,
        goal: this.goal,
        skill: stringSkill,
        functions: stringFunction
      }

      await projectUpdate(this.$route.params.id, projectData)
      this.$router.push({ name: 'projectdetail', params: {id: this.$route.params.id} })
    },
    addSkill() {
      this.skill.push({
        name: ''
      })
      console.log(this.skill)
    },
    removeSkill() {
      if (this.skill.length > 1) {
        this.skill.splice(-1, 1)
      } else {
        this.skill.splice(-1, 1)
        this.addSkill()
      }
      console.log(this.skill)
    },
    addfunc() {
      this.functions.push({
        content: ''
      })
      console.log(this.functions)
    },
    removefunc() {
      if (this.functions.length > 1) {
        this.functions.splice(-1, 1)
      } else {
        this.functions.splice(-1, 1)
        this.addfunc()
      }
      console.log(this.functions)
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>

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

.btn-delete {
  color: white;
  background-color: #F24E1E;
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

.btn-delete:hover {

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

