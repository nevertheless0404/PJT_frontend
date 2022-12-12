<template>
  <div>
    <ProjectIndexNav />
    <div class="container mt-4">
      <div class="d-flex justify-content-evenly row">
        <!-- <ProjectCalender v-bind:childValue="projects" class="col-12 col-lg-8" /> -->
        <div class="col-12 col-lg-8">
          <FullCalendar v-bind:options="calendarOptions" />
        </div>
        <!-- <p>{{ this.projects }}</p> -->

        <div class="allpjtindex col col-4 col-xs-12">
          <!-- 할 일 목록 블럭 -->
          <div class="card-body cb1">
            <div class="todoli">
              <h1 style="font-size: 40px my-5">To Do</h1>
              <div :key="idx" v-for="(todo, idx) in todos">
                <div
                  class="listbox1"
                  v-if="todo.color === 1"
                  style="font-size: 15px"
                >
                  <div class="todo2 font1">
                    {{ todo.title }}
                  </div>
                  <div class="todo1 font1">
                    {{ todo.content }}
                  </div>
                </div>

                <div
                  class="listbox2"
                  v-if="todo.color === 2"
                  style="font-size: 15px"
                >
                  <div class="todo4 font1">
                    {{ todo.title }}
                  </div>
                  <div class="todo3 font1">
                    {{ todo.content }}
                  </div>
                </div>
                <div class="listbox3" v-else style="font-size: 15px">
                  <div class="todo6 font1">
                    {{ todo.title }}
                  </div>
                  <div class="todo5 font1">
                    {{ todo.content }}
                  </div>
                </div>
              </div>
            </div>
            <div class="pjtindex">
              <div
                v-for="(project, id) in projects"
                :key="id"
                v-bind:childValue="project"
              >
                <router-link
                  :to="{ name: 'projectdetail', params: { id: project.id } }"
                  class="text-decoration-none"
                >
                  <div class="d-flex pjtbox" v-if="project.color === 1">
                    <div class="pjts-color-1"></div>
                    <div class="pjts-1">
                      <span class="pjtTitle">{{ project.title }}</span>
                    </div>
                  </div>
                  <div class="d-flex pjtbox" v-else-if="project.color === 2">
                    <div class="pjts-color-2"></div>
                    <div class="pjts-2">
                      <span class="pjtTitle">{{ project.title }}</span>
                    </div>
                  </div>
                  <div class="d-flex pjtbox" v-else>
                    <div class="pjts-color-3"></div>
                    <div class="pjts-3">
                      <span class="pjtTitle">{{ project.title }}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <router-link :to="{ name: 'projectcreate' }" class="btn1">
              프로젝트 생성
            </router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
// import ProjectCalender from '@/components/ProjectCalender.vue'
// 캘린터 임포트
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { projectIndex, todoList } from '@/api/index'

let pjt_color
export default {
  components: {
    // ProjectCalender,
    ProjectIndexNav,
    FullCalendar
  },
  data() {
    return {
      todos: [],
      projects: [
        { id: '' },
        { title: '' },
        { start_at: '' },
        { end_at: '' },
        { color: '' }
      ],
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        },
        events: []
      }
    }
  },
  computed() {},
  setup() {},
  created() {
    projectIndex() // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
      .then((response) => {
        this.projects = response.data
        for (const pjt of this.projects) {
          console.log('pjt:', pjt)
          if (pjt.color === 1) {
            pjt_color = '#3485ff'
          } else if (pjt.color === 2) {
            pjt_color = '#ffc062'
          } else {
            pjt_color = '#f24e1e'
          }
          this.calendarOptions.events.push({
            title: pjt.title,
            start: pjt.start_at,
            end: pjt.end_at,
            color: pjt_color
          })

          // 프로젝트별 할 일 목록 가져오기
          todoList(pjt.id) // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
            .then((response) => {
              response.data.forEach((ele) => {
                console.log('ele data:', ele)
                if (ele.complete != 2) {
                  this.todos.push({
                    title: ele.title,
                    content: ele.content,
                    color: pjt.color
                  })
                }
              }) // 성공하면 json 객체를 받아온다.
            })
            .catch((error) => console.log(error))
        }
      })
  },
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style scoped>
.pjtbox {
  margin-bottom: 25px;
}

.pjts-1 {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 280px;
  border-radius: 0px 10px 10px 0px;
  padding: 20px;
  color: black;

  box-shadow: inset 0px 0px 0px #3485ff;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.pjts-1:hover {
  color: white;
  box-shadow: inset 300px 0px 0px #3485ff;
}

.pjts-color-1 {
  /* background-color: white; */
  width: 20px;
  background-color: #3485ff;
  border-radius: 10px 0px 0px 10px;
}

.pjts-1:hover {
  color: white;
  box-shadow: inset 300px 0px 0px #3485ff;
}

.pjts-2 {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 280px;
  border-radius: 0px 10px 10px 0px;
  border: #f2f2f2;
  border-style: solid;
  border-width: 0px;
  padding: 20px;
  color: black;

  box-shadow: inset 0px 0px 0px #ffc062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.pjts-color-2 {
  /* background-color: white; */
  width: 20px;
  background-color: #ffc062;
  border-radius: 10px 0px 0px 10px;
}

.pjts-2:hover {
  box-shadow: inset 300px 0px 0px #ffc062;
  color: white;
}

.pjts-3 {
  background-color: white;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 280px;
  border-radius: 0px 10px 10px 0px;
  border: #f2f2f2;
  border-style: solid;
  border-width: 0px;
  padding: 20px;
  color: black;

  box-shadow: inset 0px 0px 0px #f24e1e;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.pjts-color-3 {
  /* background-color: white; */
  width: 20px;
  background-color: #f24e1e;
  border-radius: 10px 0px 0px 10px;
}

.pjts-3:hover {
  box-shadow: inset 300px 0px 0px #f24e1e;
  color: white;
}

.btn1 {
  display: flex;
  color: white;
  background-color: #3485ff;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align: center;
  box-shadow: inset 0px 0px 0px #ffc062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.btn1:hover {
  box-shadow: inset 300px 0px 0px 0px #ffc062;
}

.pjtTitle {
  font-weight: bold;
  text-decoration: none;
}

.pjtindex {
  margin-top: 30px;
  width: 300px;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.pjtindex::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.allpjtindex {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 800px;
  
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
  padding-right: 200px;
  padding-left: 200px;
}

/* 할 일 목록 스타일 */
.cb1 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.font1 {
  font-family: 'Dela Gothic One';
  font-weight: bold;
}

.todoli {
  display: flex;
  flex-direction: column;
  border: #9f9f9f;
  border-style: solid;
  border-width: 1px;
  padding: 20px;
  border-radius: 10px;
}

.progressbar {
  display: flex;
  align-items: center;
  margin: 10px;
}

.allprogress {
  display: flex;
  margin-left: 100px;
  align-items: center;
}

.pnj {
  margin-top: 10px;
}

#progress {
  appearance: none;
}
#progress::-webkit-progress-bar {
  background: #ffc062;
  border-radius: 4px;
}
#progress::-webkit-progress-value {
  border-radius: 4px;
  background: #3485ff;
}

.listbox1 {
  display: flex;
  transform: translateX(0);
  transition-property: transform, overflow, white-space, width;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.listbox2 {
  display: flex;
  transform: translateX(0);
  transition-property: transform, overflow, white-space, width;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.listbox3 {
  display: flex;
  transform: translateX(0);
  transition-property: transform, overflow, white-space, width;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.listbox1:hover {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  
}

.listbox1:hover * {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  
  color: rgb(0, 0, 0);
  box-shadow: inset 0px -5px 0px 0px #3485ff;
}

.listbox2:hover {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  
}

.listbox2:hover * {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  
  color: rgb(0, 0, 0);
  box-shadow: inset 0px -5px 0px 0px #ffc062;
}

.listbox3:hover {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  
}

.listbox3:hover * {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  
  color: rgb(0, 0, 0);
  box-shadow: inset 0px -5px 0px 0px #f24e1e;
}

.todo1 {
  margin-bottom: 5px;
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 0px;
  border: #9f9f9f;
  border-style: solid;
  border-width: 0px 0px 1px 0px;

  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  box-shadow: inset 0px 0px 0px #3485ff;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.todo2 {
  margin-bottom: 5px;
  background-color: #3485ff;
  color: rgb(0, 0, 0);
  padding: 5px;
  border-radius: 20px 0px 0px 20px;
  border: #3485ff;
  border-width: 4px;
  border-style: solid;

  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo3 {
  margin-bottom: 5px;
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 0px;
  border: #9f9f9f;
  border-style: solid;
  border-width: 0px 0px 1px 0px;

  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  box-shadow: inset 0px 0px 0px #ffc062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.todo4 {
  margin-bottom: 5px;
  background-color: #ffc062;
  color: rgb(0, 0, 0);
  padding: 5px;
  border-radius: 20px 0px 0px 20px;
  border: #ffc062;
  border-width: 4px;
  border-style: solid;

  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo5 {
  margin-bottom: 5px;
  background-color: white;
  color: black;
  padding: 5px;
  border-radius: 0px;
  border: #9f9f9f;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  box-shadow: inset 0px 0px 0px #f24e1e;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.todo6 {
  margin-bottom: 5px;
  background-color: #f24e1e;
  color: rgb(0, 0, 0);
  padding: 5px;
  border-radius: 20px 0px 0px 20px;
  border: #f24e1e;
  border-width: 4px;
  border-style: solid;

  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn1 {
  display: flex;
  color: white;
  background-color: #9e9e9e;
  box-shadow: 5px 9px 16px 0px #0d224216;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 300px;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align: center;
  box-shadow: inset 0px 0px 0px #adb5bd;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.btn2 {
  display: flex;
  color: white;
  background-color: #9e9e9e;
  box-shadow: 5px 9px 16px 0px #0d224216;
  margin-bottom: 5px;
  width: 300px;
  height: 30px;
  border-radius: 0px 0px 10px 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align: center;
  box-shadow: inset 0px 0px 0px #adb5bd;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
