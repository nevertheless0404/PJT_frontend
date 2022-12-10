<template>
  <div>
    <FullCalendar v-bind:options="calendarOptions" />
    
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


export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: ['childValue'],
  data() {
    return {
      projects: this.childValue,
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek',
      },
      events: this.calenders,
      editable: true,
      selectable: true,
    }
  }
},
created() {
console.log(this.projects)
}
}
</script>


<style scope>
.fc-daygrid-day-number{
  color: black !important;
  text-decoration: none !important;
}

.fc-col-header-cell-cushion{
  color: black !important;
  text-decoration: none !important;
}
</style>