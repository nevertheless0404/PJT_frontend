<script setup>
import { reactive } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek'
  },
  editable: true,
  selectable: true,

});
</script>

<template>
  <div>
    <FullCalendar v-bind:options="options" />
  </div>
</template>

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