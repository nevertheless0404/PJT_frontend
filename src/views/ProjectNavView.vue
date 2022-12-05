<template>
  <div>
    <ProjectIndexNav />
    <router-view />
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
export default {
  components: { ProjectIndexNav },
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
