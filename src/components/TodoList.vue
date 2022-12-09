<template>
  <div>
    {{ todo_list }}
    <!--todos 리스트 데이터에 체크된 인덱스 번호를 todo_lst에 저장하여 추후에 todos에 인덱스로 접근하여 complete 상태 변환해서 보내기-->
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="todoSubmit">
          <div class='todoli'>
            <h1 style="font-size: 40px my-5">To Do List</h1>
            <div class='allprogress'>
              <p class='pnj'>P</p>
              <div class='progressbar'>
                <progress id="progress" value="20" max="100"></progress>
              </div>
              <p class='pnj'>J</p>
            </div>
          </div> 
          <div :key="idx" v-for="(todo, idx) in todos">
            <input
              type="checkbox"
              name=""
              id="html"
              :value="idx"
              v-model="todo_list"
              style="width: 25px; height: 25px"
            />
            <label class="ms-3 font1" for="html"  style="font-size: 15px"
              >{{ todo.title }} | {{ todo.project }}</label
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      todos: [
        // 백엔드에서 가져온 데이터 리스트
        { title: '할일 목록1', project: '프로젝트1', complete: 0 },
        { title: '할일 목록2', project: '프로젝트2', complete: 0 },
        { title: '할일 목록3', project: '프로젝트3', complete: 1 },
        { title: '할일 목록4', project: '프로젝트4', complete: 1 },
        { title: '할일 목록5', project: '프로젝트5', complete: 0 }
      ],
      todo_list: [] // 할 일 완료 후 체크 한 값 저장리스트 => 체크 완료 후 변경된 리스트를 백엔드로 보내줘야함
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async todoSubmit() {
      const response = await axios.post('login/', {
        email: this.email,
        password: this.password
      })
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      this.$store.dispatch('user', response.data.user)
      this.$router.push('/project')
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Dela Gothic One', cursive;
}

.font1 {
  font-family: 'Noto Serif KR', serif;
}

.todoli {
  display: flex;
}

.progressbar {
  display: flex;
  align-items: center;
  margin: 10px;
  
}

.allprogress {
  display: flex;
  margin-left: 100px;
  align-items: center;
}

.pnj {
  margin-top:10px;
}

#progress {
    appearance: none;
}
#progress::-webkit-progress-bar {
    background: #FFC062;
    border-radius:4px;
   
}
#progress::-webkit-progress-value {
    border-radius:4px;
     background:#3485FF;



}
</style>
