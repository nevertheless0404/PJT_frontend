<template>
  <div>
    <ProjectIndexNav />
    <div class="container d-flex justify-content-evenly mt-4">
      <ProjectCalender />
      <!-- <p>{{ this.projects }}</p> -->
      <div>
        <div v-for="(project, id) in projects" :key="id">
          <div class="pjts mb-3">
            <span class="pjtTitle">{{ project.title }}</span>
          </div>
        </div>
        <router-link
          :to="{ name: 'projectcreate', params: {} }"
          class="btn btn-outline-primary"
          >프로젝트 생성</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
import ProjectCalender from '@/components/ProjectCalender.vue'
import { projectIndex } from '@/api/index'
export default {
  components: {
    ProjectCalender, ProjectIndexNav
  },
  data() {
    return {
      projects: [{ id: '' }, { title: '' }, { start_at: '' }, { end_at: '' }]
    }
  },
  setup() {},
  created() {
    projectIndex() // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
      .then((response) => {
        console.log(response)
        this.projects = response.data
        //   this.projects.push({
        //     deadline: ''
        //   })
        //   this.projects.forEach((ele) => {
        //   stringSkill += ele.name + ' '
        // })
        //   const year = Number(this.projects.end_at.slice(0, 4))
        //   console.log(year)
      }) // 성공하면 json 객체를 받아온다.
      .catch((error) => console.log(error))
  },
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style scoped>
.pjts {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
}
.pjtTitle {
  font-weight: 500;
}
</style>
