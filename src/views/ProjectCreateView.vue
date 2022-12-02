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
        v-model="title"
      />
    </div>
    <div class="mb-3">
      <label for="example-datepicker">프로젝트 시작일</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="start_at"
        class="mb-2"
      ></b-form-datepicker>
    </div>
    <div class="mb-3">
      <label for="example-datepicker2">프로젝트 종료일</label>
      <b-form-datepicker
        id="example-datepicker2"
        v-model="end_at"
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
        v-model="goal"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >사용 언어 / 개발 환경</label
      >
      <input
        type="text"
        class="form-control mb-3"
        id="exampleFormControlInput1"
        placeholder="Tech stack"
        v-model="s.name"
        :key="id"
        v-for="(s, id) in skill"
      />
      <div id="exampleFormControlInput1" class="form-text">
        <button @click="addSkill">+추가</button>
      </div>
      <div id="exampleFormControlInput1" class="form-text">
        <button @click="removeSkill">-삭제</button>
      </div>
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
      title: '',
      start_at: '',
      end_at: '',
      goal: '',
      skill: [
        {
          name: ''
        }
      ],
      functions: [
        {
          content: ''
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    addSkill() {
      this.skill.push({
        name: ''
      })
      console.log(this.skill)
    },
    removeSkill() {
      if (this.skill.length > 1) {
        this.skill.splice(-1, 1)
      } else {
        this.skill.splice(-1, 1)
        this.addSkill()
      }
      console.log(this.skill)
    }
  }
}
</script>

<style scoped></style>
