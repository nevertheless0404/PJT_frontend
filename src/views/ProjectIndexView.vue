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
        
          <router-link
            :to="{ name: 'projectcreate' }"
            class="btn1"
            ><i class="bi bi-plus-lg"></i>&nbsp;프로젝트 생성</router-link>
          <TodoList />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
// import ProjectCalender from '@/components/ProjectCalender.vue'
import TodoList from '@/components/TodoList.vue'
// 캘린터 임포트
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { projectIndex } from '@/api/index'

// let color_lst = [
//     '#F24E1E' /*red*/,
//     '#59BDF5' /*skyblue*/,
//     '#FFC062' /*skin*/,
//     '#3C59EE' /*dark-blue*/,
//     '#FEDE35' /*yellow*/,
//     '#3485FF' /*blue*/,
//     '#FF9737' /*orange*/,
//     '#89CD69' /*yellow-green*/,
//     '#8D68F3' /*purple*/,
//     '#4EB791' /*green*/
//   ],
//   color_idx = 0

let pjt_color
export default {
  components: {
    // ProjectCalender,
    ProjectIndexNav,
    TodoList,
    FullCalendar
  },
  data() {
    return {
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
        let idx = 0
        for (const pjt of this.projects) {
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
        }
        colorChange()
      })
      .catch((error) => console.log(error))
  },
  mounted() {},
  unmounted() {},
  methods: {
    // colorChange() {
    //   // pjts-color 스타일 컬러 속성 주기
    //   let pjts = document.getElementsByClassName('pjts-color')
    //   for (let i = 0; i < pjts.length; i++) {
    //     if (color_idx < color_lst.length) {
    //       pjts[i].style.backgroundColor = color_lst[color_idx]
    //     } else {
    //       color_idx = 0
    //       pjts[i].style.backgroundColor = color_lst[color_idx]
    //     }
    //     color_idx += 1
    //   }
    //   color_idx = 0
    //   // pjt 스타일 컬러 속성 주기
    //   let pjts_2 = document.getElementsByClassName('pjts')
    //   for (let i = 0; i < pjts_2.length; i++) {
    //     if (color_idx < color_lst.length) {
    //       pjts_2[i].style.boxShadow = color_lst[color_idx]
    //     } else {
    //       color_idx = 0
    //       pjts_2[i].style.boxShadow = color_lst[color_idx]
    //     }
    //     color_idx += 1
    //   }
    //   color_idx = 0
    // pjt hover 속성 주기
    // 포기...
  }
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
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.pjts-1:hover {
  color: white;
  box-shadow: inset 300px 0px 0px #3485FF;
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
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
}

.btn1:hover {
  box-shadow: inset 300px 0px 0px 0px #ffc062;
}

.pjtTitle {
  font-weight: 500;
  text-decoration: none;
}

.pjtindex {
  margin-top: 50px;
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
  height:800px;

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
</style>
