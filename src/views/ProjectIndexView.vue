<template>
  <div>
    <ProjectIndexNav />

    <div class="container mt-4">
      <div class="d-flex justify-content-evenly row">
        <ProjectCalender v-bind:childValue="projects" class="col-12 col-lg-8" />
        <!-- <p>{{ this.projects }}</p> -->
        
        <div class='allpjtindex col col-4 col-xs-12'>
          <div  class='pjtindex'>
            <div v-for="(project, id) in projects" :key="id" v-bind:childValue="project">
              <router-link
                :to="{ name: 'projectdetail', params: { id: project.id } }" class="text-decoration-none"
              >
                
                <div class="d-flex pjtbox" v-if="project.color === 1">
                  <div class="pjts-color-1">
                  </div>
                  <div class="pjts-1">
                    <span class="pjtTitle">{{ project.title }}</span>
                  </div>
                </div>
                
                <div class="d-flex pjtbox" v-else-if="project.color === 2">
                  <div class="pjts-color-2">
                  </div>
                  <div class="pjts-2">
                    <span class="pjtTitle">{{ project.title }}</span>
                  </div>
                </div>
                
                <div class="d-flex pjtbox" v-else>
                  <div class="pjts-color-3">
                  </div>
                  <div class="pjts-3">
                    <span class="pjtTitle">{{ project.title }}</span>
                  </div>
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
      projects: [{ id: '' }, { title: '' }, { start_at: '' }, { end_at: '' }, { color: '' }]
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
.pjtbox{
  margin-bottom: 25px;
}

.pjts-1 {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 280px;
  border-radius: 0px 10px 10px 0px;
  padding:20px;
  color: black;

  box-shadow: inset 0px 0px 0px #3485FF;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
  
}

.pjts-color-1 {
  background-color: white;
  width: 20px;
  background-color: #3485FF;
  border-radius: 10px 0px 0px 10px;
  
}

.pjts-1:hover {
  color: white;
  box-shadow: inset 300px 0px 0px #3485FF;
}

.pjts-2 {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 280px;
  border-radius: 0px 10px 10px 0px;
  border: #F2F2F2;
  border-style: solid;
  border-width: 0px;
  padding:20px;
  color: black;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.pjts-color-2 {
  background-color: white;
  width: 20px;
  background-color: #FFC062;
  border-radius: 10px 0px 0px 10px;
}

.pjts-2:hover {
  box-shadow: inset 300px 0px 0px #FFC062;
  color: white;
}

.pjts-3 {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 280px;
  border-radius: 0px 10px 10px 0px;
  border: #F2F2F2;
  border-style: solid;
  border-width: 0px;
  padding:20px;
  color: black;

  box-shadow: inset 0px 0px 0px #F24E1E;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.pjts-color-3 {
  background-color: white;
  width: 20px;
  background-color: #F24E1E;
  border-radius: 10px 0px 0px 10px;
}

.pjts-3:hover {
  box-shadow: inset 300px 0px 0px #F24E1E;
  color: white;
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

.pjtTitle {
  font-weight: bold;
  text-decoration: none;
}

.pjtindex {
  margin-top:50px;
  margin-bottom:20px;
  width: 300px;
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
  height:500px;
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

.container1 {
  padding-right:200px;
  padding-left:200px;
}


</style>
