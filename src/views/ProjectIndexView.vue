<template>
  <div>
    <ProjectIndexNav />
    <router-link to="/projectcreate" class="btn btn-outline-primary"
      >프로젝트 생성</router-link
    >
    <ProjectCalender />
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
import ProjectCalender from '@/components/ProjectCalender.vue'

export default {
  components: {
    ProjectIndexNav,
    ProjectCalender
  },
  data() {
    return {
      sampleData: ''
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
