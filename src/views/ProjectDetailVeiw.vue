<template>
  <div>
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-4">
      <ProjectCalender />
      <kanbanBoard />
    </div>
  </div>
</template>

<script>
import NavProject from '@/components/NavBar_detail.vue'
import ProjectCalender from '@/components/ProjectCalender.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
export default {
  components: { ProjectCalender, NavProject, KanbanBoard },
  data() {
    return {
      props: '$route.params.id',
      newTask: '',
      arrBacklog: [
        { name: '하루종일 숨쉬기' },
        { name: '침대에서 뒹굴거리기' },
        { name: '밥 잘먹기' }
      ],
      arrInProgress: [],
      arrDone: [],
      pjtPk: this.$route.params.id
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    add() {
      if (this.newTask) {
        this.arrBacklog.push({ name: this.newTask })
        this.newTask = ''
      }
    }
  }
}
</script>

<style scoped></style>
