<template>
  <div class="container">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >프로젝트 제목</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="PJT 프로젝트"
      />
    </div>
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">프로젝트 팀원</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1" placeholder="Email"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          + 팀원 추가하기
        </div>
      </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >프로젝트 이름</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="웹 프로젝트"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
