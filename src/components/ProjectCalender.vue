<template>
  <div>
    <FullCalendar v-bind:options="calendarOptions" />
    <button @click="cal">정보 불러오기</button>
    {{ this.projects }}
  </div>
</template>

<script>
import { reactive } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

// console.log('this.project:')

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      projects: this.childValue,
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
  computed() {
    console.log('created')
  },
  methods: {
    cal() {
      console.log('calendar 함수 실행')
      console.log('this.projects :', this.projects)
      for (const pjt of this.projects) {
        this.calendarOptions.events.push({
          title: pjt.title,
          start: pjt.start_at,
          end: pjt.end_at
        })
      }
    }
  }
}
</script>

<style scoped>
/* .fc-daygrid-day-number {
  color: black !important;
  text-decoration: none !important;
}

.fc-col-header-cell-cushion {
  color: black !important;
  text-decoration: none !important;
} */
</style>
