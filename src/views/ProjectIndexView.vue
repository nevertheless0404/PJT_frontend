<template>
  <div>
    <router-link :to="{ name: 'projectcreate' }" class="btn btn-outline-primary"
      >프로젝트 생성</router-link
    >
    <ProjectCalender class="w-50"/>
    <router-view></router-view>
  </div>
</template>

<script>
import ProjectCalender from '@/components/ProjectCalender.vue'

export default {
  components: {
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
