<template>
  <div>
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-4">
      <InformBoard />
      <!-- <ProjectCalender /> -->
      <FullCalendar v-bind:options="calendarOptions" />
      <KanbanBoard />
    </div>
  </div>
</template>

<script>
import NavProject from '@/components/NavBar_detail.vue'
// import ProjectCalender from '@/components/ProjectCalender.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import InformBoard from '@/components/InformBoard.vue'
// 캘린터 임포트
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { todoList } from '@/api/index'

export default {
  components: { NavProject, KanbanBoard, InformBoard, FullCalendar },
  data() {
    return {
      pjtPk: this.$route.params.id,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        },
        events: [],
        editable: true,
        selectable: true
      }
    }
  },
  setup() {},
  created() {
    todoList(this.$route.params.id) // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
      .then((response) => {
        response.data.forEach((ele) => {
          console.log(ele)
          if (ele.complete === 0 || ele.complete === 1) {
            console.log('조건문 내부')
            this.calendarOptions.events.push({
              title: ele.title,
              start: ele.start_at,
              end: ele.end_at,
              color: 'red'
            })
          }
        })
      }) // 성공하면 json 객체를 받아온다.
      .catch((error) => console.log(error))
  },
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style scoped></style>
