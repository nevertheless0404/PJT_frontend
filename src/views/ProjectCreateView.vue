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
      <label for="example-datepicker">프로젝트 시작일</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="value"
        class="mb-2"
      ></b-form-datepicker>
    </div>
    <div class="mb-3">
      <label for="example-datepicker2">프로젝트 종료일</label>
      <b-form-datepicker
        id="example-datepicker2"
        v-model="value"
        class="mb-2"
      ></b-form-datepicker>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >프로젝트 목표</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="PJT"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >사용 언어 / 개발 환경</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Python"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">주요 기능</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        placeholder=""
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        <button>+ 기능 추가하기</button>
      </div>
    </div>
    <router-link to="/membercreate" class="btn btn-outline-primary"
      >다음</router-link
    >
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isCreate: false
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
  }
}
</script>

<style scoped></style>
