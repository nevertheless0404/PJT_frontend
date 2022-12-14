<template>
  <div>
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-4">
      <InformBoard />
      <!-- <ProjectCalender /> -->
      <FullCalendar v-bind:options="calendarOptions" />
      <KanbanBoard :key="componentKey" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavProject from '@/components/NavBar_detail.vue'
// import ProjectCalender from '@/components/ProjectCalender.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import InformBoard from '@/components/InformBoard.vue'
// 캘린터 임포트
import { reactive } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { todoList } from '@/api/index'

let color_lst = [
  '#F24E1E' /*red*/,
  '#59BDF5' /*skyblue*/,
  '#FFC062' /*skin*/,
  '#3C59EE' /*dark-blue*/,
  '#FEDE35' /*yellow*/,
  '#3485FF' /*blue*/,
  '#FF9737' /*orange*/,
  '#89CD69' /*yellow-green*/,
  '#8D68F3' /*purple*/,
  '#4EB791' /*green*/
]
export default {
  components: { NavProject, KanbanBoard, InformBoard, FullCalendar },
  data() {
    return {
      componentKey: 0,
      pjtPk: this.$route.params.id,
      calendarOptions: reactive({
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'title',
          center: '',
          right: 'prev,next',
        },
        events: []
      })
    }
  },
  setup() {},
  created() {
    todoList(this.$route.params.id) // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
      .then((response) => {
        let idx = 0
        for (let ele of response.data) {
          if (ele.complete === 0 || ele.complete === 1) {
            this.calendarOptions.events.push({
              title: ele.title,
              start: ele.start_at,
              end: ele.end_at,
              color: color_lst[idx]
            })
          }
          if (idx == color_lst.length - 1) {
            idx = 0
          } else {
            idx += 1
          }
        }
      })
      .catch((error) => console.log(error))
  },
  mounted() {},
  unmounted() {},
  methods: {
    forceRerender() {
      this.componentKey += 1
    },
    calendarRefresh() {
      this.calendarOptions.events = []
      todoList(this.$route.params.id) // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
        .then((response) => {
          let idx = 0
          for (let ele of response.data) {
            if (ele.complete === 0 || ele.complete === 1) {
              this.calendarOptions.events.push({
                title: ele.title,
                start: ele.start_at,
                end: ele.end_at,
                color: color_lst[idx]
              })
            }
            if (idx == color_lst.length - 1) {
              idx = 0
            } else {
              idx += 1
            }
          }
        }) // 성공하면 json 객체를 받아온다.
        .catch((error) => console.log(error))
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped></style>
