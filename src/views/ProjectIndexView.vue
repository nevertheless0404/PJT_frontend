<template>
  <div>
    <ProjectIndexNav />
    <div class="container mt-4">
      <div class="d-flex justify-content-evenly row">
        <ProjectCalender  v-bind:childValue="projects" class="col-12 col-lg-8" />
        <!-- <p>{{ this.projects }}</p> -->
        <div class="col-12 col-lg-4 d-flex flex-column align-items-center p-4">
          <div v-for="(project, id) in projects" :key="id" class="w-100">
            <div class="pjts w-100">
              <router-link
                :to="{ name: 'projectdetail', params: { id: project.id } }">
                <div class="pjts">
                  <span class="pjtTitle">{{ project.title }}</span>
                </div>
              </router-link>
            </div>
          </div>
          <router-link
            :to="{ name: 'projectcreate' }"
            class="btn1"
            >프로젝트 생성</router-link>
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
  border: #D9D9D9 solid 2px;
  
  
}

.pjts:hover {
  border: #3485FF solid 2px;
}

.btn1 {
  color: white;
  background-color: #3485FF;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: #D9D9D9 solid 2px;
  text-decoration: none;
  text-align : center;
}

.btn1:hover {
  border: #3485FF solid 2px;
}

.pjtTitle {
  font-weight: 500;
  text-decoration: none;
}

.pjtindex {
  height:300px;
  width: 400px;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.pjtindex::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}


.allpjtindex{
  display: flex;
  align-items: center;
  flex-direction: column;
}


.project_add {
  font-size: 17px;
  font-weight: 600;
  background-color: rgb(45, 126, 250);
  color: white;
  border-radius: 40px;
  height: 55px;
}

.project_add:hover {
  background-color: #2064ca;
  color: white;
  transform: scale(1.05);
  transition: 0.3s;
}

</style>
