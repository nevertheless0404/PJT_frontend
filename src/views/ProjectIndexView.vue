<template>
  <div>
    <ProjectIndexNav />
    <div class="container mt-4">
      <div class="d-flex justify-content-evenly">
        <ProjectCalender />
        <!-- <p>{{ this.projects }}</p> -->
        <div>
          <div v-for="(project, id) in projects" :key="id">
            <div class="pjts">
              <router-link
                :to="{ name: 'projectdetail', params: { id: project.id } }"
              >
                <span class="pjtTitle">{{ project.title }}</span>
              </router-link>
            </div>
          </div>
          <router-link
            :to="{ name: 'projectcreate' }"
            class="btn btn-warning"
            >프로젝트 생성</router-link
          >
        </div>
      </div>
      <TodoList />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
import ProjectCalender from '@/components/ProjectCalender.vue'
import TodoList from '@/components/TodoList.vue'

import { projectIndex } from '@/api/index'
export default {
  components: {
    ProjectCalender,
    ProjectIndexNav,
    TodoList
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
  margin-bottom: 30px;
}
.pjtTitle {
  font-weight: 500;
}

a{
  text-decoration: none;
  color: black;
}

</style>
