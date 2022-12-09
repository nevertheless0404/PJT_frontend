<template>
  <div>
    <ProjectIndexNav />
    <router-view></router-view>
    <div v-if="this.$router" class="container">
      <form @submit.prevent="putpjt">
        <div class="mb-3">
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
                <b-button size="sm" variant="outline-primary" @click="addSkill"
                  ><i class="bi bi-plus-lg"></i> 추가</b-button
                >
              </div>
              <div id="exampleFormControlInput1" class="">
                <b-button
                  size="sm"
                  variant="outline-danger"
                  @click="removeSkill"
                  ><i class="bi bi-dash-lg"></i> 삭제</b-button
                >
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
                <b-button size="sm" variant="outline-primary" @click="addfunc"
                  ><i class="bi bi-plus-lg"></i> 추가</b-button
                >
              </div>
              <div id="emailHelp" class="">
                <b-button size="sm" variant="outline-danger" @click="removefunc"
                  ><i class="bi bi-dash-lg"></i> 삭제</b-button
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
        <button type="submit" class="btn btn-primary">다음</button>
      </form>
    </div>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
import { projectGet } from '@/api/index'
import { projectUpdate } from '@/api/index'

export default {
  components: { ProjectIndexNav },
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
    }
  },
  methods: {
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
      this.$router.push({ name: 'projectindex' })
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
  }
}
</script>

<style scoped></style>
