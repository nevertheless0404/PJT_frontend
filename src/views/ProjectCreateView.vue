<template>
  <div>
    <ProjectIndexNav />
    <router-view></router-view>
    <div v-if="this.$router" class="container">
      <p>{{ $route.params.id }}</p>
      <form @submit.prevent="submitpjt">
        <div class="mt-5 mb-3">
          <b-breadcrumb :items="items"></b-breadcrumb>
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
            :max="end_at"
            class="mb-2"
          ></b-form-datepicker>
        </div>
        <div class="mb-3">
          <label for="example-datepicker2">프로젝트 종료일</label>
          <b-form-datepicker
            id="example-datepicker2"
            v-model="end_at"
            :min="start_at"
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
          <div class="d-flex justify-content-between">
            <label for="exampleFormControlInput1" class="form-label"
              >사용 언어 / 개발 환경</label
            >
            <div class="d-flex mb-2">
              <div id="exampleFormControlInput1" class="me-2">
                <div class="btn2" @click="addSkill">
                  <i class="bi bi-plus-lg"></i> 추가
                </div>
              </div>
              <div id="exampleFormControlInput1" class="">
                <div class="btn3" @click="removeSkill">
                  <i class="bi bi-dash-lg"></i> 삭제
                </div>
              </div>
            </div>
          </div>
          <input
            type="text"
            class="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Tech stack"
            v-model="s.name"
            :key="id"
            v-for="(s, id) in skill"
          />
        </div>
        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label for="exampleInputEmail1" class="form-label">주요 기능</label>
            <div class="d-flex mb-2">
              <div id="emailHelp" class="me-2">
                <div class="btn2" @click="addfunc">
                  <i class="bi bi-plus-lg"></i> 추가
                </div>
              </div>
              <div id="emailHelp" class="">
                <div class="btn3" @click="removefunc">
                  <i class="bi bi-dash-lg"></i> 삭제
                </div>
              </div>
            </div>
          </div>
          <input
            type="text"
            class="form-control mb-3"
            id="exampleInputEmail1"
            placeholder="Functions"
            aria-describedby="emailHelp"
            v-model="func.content"
            :key="id"
            v-for="(func, id) in functions"
          />
        </div>
        <div class="btn1box">
          <button type="submit" class="btn1">다음</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ProjectIndexNav from '@/components/ProjectIndexNav.vue'
import { projectCreate } from '@/api/index'
export default {
  components: { ProjectIndexNav },
  data() {
    return {
      items: [
        {
          text: 'Home',
          to: { name: 'projectindex' }
        },
        {
          text: 'Project Create',
          active: true
        }
      ],
      id: '',
      title: '',
      start_at: '',
      end_at: '',
      goal: '',
      skill: [{ name: '' }],
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
    async submitpjt() {
      // API 요청시 전달할 userData 객체
      let stringSkill = ''
      this.skill.forEach((ele) => {
        stringSkill += ele.name + ';'
      })
      stringSkill = stringSkill.substr(0, stringSkill.length - 1)
      let stringFunction = ''
      this.functions.forEach((ele) => {
        stringFunction += ele.content + ';'
      })
      stringFunction = stringFunction.substr(0, stringFunction.length - 1)
      const projectData = {
        id: this.id,
        title: this.title,
        start_at: this.start_at,
        end_at: this.end_at,
        goal: this.goal,
        skill: stringSkill,
        functions: stringFunction
      }

      await projectCreate(projectData)
      this.$router.push({ name: 'projectindex' })
    },
    addSkill() {
      this.skill.push({
        name: ''
      })
    },
    removeSkill() {
      if (this.skill.length > 1) {
        this.skill.splice(-1, 1)
      } else {
        this.skill.splice(-1, 1)
        this.addSkill()
      }
    },
    addfunc() {
      this.functions.push({
        content: ''
      })
    },
    removefunc() {
      if (this.functions.length > 1) {
        this.functions.splice(-1, 1)
      } else {
        this.functions.splice(-1, 1)
        this.addfunc()
      }
    }
  }
}
</script>

<style scoped>
.btn1box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.btn1 {
  color: white;
  background-color: #3485ff;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align: center;

  box-shadow: inset 0px 0px 0px #ffc062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.btn1:hover {
  box-shadow: inset 300px 0px 0px 0px #ffc062;
}

.btn2 {
  color: white;
  background-color: #3485ff;
  width: 70px;
  height: 31px;
  border-radius: 3px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align: center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #ffc062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.2s cubic-bezier(0.5, 0.24, 0, 1);
}

.btn2:hover {
  box-shadow: inset 70px 0px 0px 0px #ffc062;
}

.btn3 {
  color: white;
  background-color: #f24e1e;
  box-shadow: 5px 9px 16px 0px #f24e1e;
  width: 70px;
  height: 31px;
  border-radius: 3px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align: center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #ffc062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.2s cubic-bezier(0.5, 0.24, 0, 1);
}

.btn3:hover {
  box-shadow: inset 300px 0px 0px 0px #ffc062;
}
</style>
