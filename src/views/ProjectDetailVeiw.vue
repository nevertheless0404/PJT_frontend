<template>
  <div>
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-4">
      <InformBoard />
      <ProjectCalender />
      <KanbanBoard />
    </div>
    user : {{ user }}
  </div>
</template>

<script>
import NavProject from '@/components/NavBar_detail.vue'
import ProjectCalender from '@/components/ProjectCalender.vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import InformBoard from '@/components/InformBoard.vue'

export default {
  components: { ProjectCalender, NavProject, KanbanBoard, InformBoard },
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
