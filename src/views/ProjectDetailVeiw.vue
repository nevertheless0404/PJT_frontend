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
      pjtPk: this.$route.params.id
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style scoped></style>
