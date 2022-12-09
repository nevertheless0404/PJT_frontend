<template>
  <div>
    <NavBar_detail />

    <div class="notice container d-flex flex-column align-items-center">
      <h1 class="title fw-bold my-5">Notice</h1>
      <b-container fluid>
        <b-row>
          <b-col sm="1">
            <label for="exampleInputInforms1" class="form-label">Notice:</label>
          </b-col>
          <b-col sm="10">
            <b-form-textarea
            id="notice"
            placeholder="Put a notice"
            rows="3"
            max-rows="8"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </b-container>
      <div class="d-flex m-2">
        <div id="exampleInputInforms1" class="me-2">
          <b-button size="sm" variant="outline-primary" @click="addNotice"
          ><i class="bi bi-plus-lg"></i> 추가</b-button
          >
        </div>
        <div id="exampleInputInforms1" class="">
          <b-button
          size="sm"
          variant="outline-danger"
          @click="removeNotice"
          ><i class="bi bi-dash-lg"></i> 삭제</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar_detail from '@/components/NavBar_detail.vue'
export default {
  components: { NavBar_detail },
  data() {
    return {
      content: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style scoped>
.title {
  text-align: center;
  font-family: 'Dela Gothic One', cursive;
}

</style>
