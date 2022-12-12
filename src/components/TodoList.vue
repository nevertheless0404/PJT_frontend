<template>
  <div>

    <!--todos 리스트 데이터에 체크된 인덱스 번호를 todo_lst에 저장하여 추후에 todos에 인덱스로 접근하여 complete 상태 변환해서 보내기-->

      <div class="card-body cb1">
          <div class='todoli'>
            <div style="font-size: 40px my-5" class="btn1" >할 일 목록</div>
            </div>
          </div>
            <div v-for="(todo, idx) in todos"  v-if="todo.complete === 0">
              <div class="ms-3" v-if="todo.project.color === 1" style="font-size: 15px">
              <div class="todo2 font1">{{ todo.project }}</div><div class="todo1 font1">{{ todo.title }}</div>
              </div>

              <div class="ms-3" v-if="todo.project.color === 2" style="font-size: 15px">
              <div class="todo2 font1">{{ todo.project }}</div><div class="todo1 font1">{{ todo.title }}</div>
              </div>

              <div class=" listbox" v-else style="font-size: 15px" >
              <div class="todo2 font1">{{ todo.project }}</div><div class="todo1 font1">{{ todo.title }}</div>
              </div>
            </div>
            <div style="font-size: 40px my-5" class="btn2" ></div>
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
        { title: '놀기먹고자기', project: '해피프젝', complete: 0 },
        { title: '응애응애울기', project: '재미로하는프젝', complete: 0 },
        { title: '집에가서 발닦고 자기', project: '모시모시', complete: 1 },
        { title: '아니 진짜', project: '고니찌와', complete: 1 },
        { title: '하나하나 열심히 바로바로하기', project: '타짜', complete: 0 }
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
.cb1 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.font1 {
  font-family: 'Dela Gothic One';
  font-weight: bold;
}

.todoli {
  display: flex;
  flex-direction: column;
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

.listbox {
  display: flex;
  transform:translateX(0);
  transition-property:transform, background, overflow, white-space, width;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.listbox:hover   {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  width: auto;

}

.listbox:hover * {
  overflow: visible;
  white-space: wrap;
  min-width: 80px;
  width: auto;
  color: white;
  box-shadow: inset 300px 0px 0px #f24e1e;
}





.todo1 {
  margin-bottom: 5px;
  background-color: white;
  color: black;
  padding:5px;
  border-radius: 0px 10px 10px 0px;
  border: #F24E1E;;

  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  box-shadow: inset 0px 0px 0px #f24e1e;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}


.todo2 {
  margin-bottom: 5px;
  background-color: #F24E1E;
  color: white;
  padding:5px;
  border-radius: 10px 0px 0px 10px;
  border: #F24E1E;

  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.btn1 {
  display: flex;
  color: white;
  background-color: #9E9E9E;
  box-shadow: 5px 9px 16px 0px #0d224216;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 300px;
  height: 30px;
  border-radius: 10px 10px 0px 0px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #adb5bd;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.btn2 {
  display: flex;
  color: white;
  background-color: #9E9E9E;
  box-shadow: 5px 9px 16px 0px #0d224216;
  margin-bottom: 5px;
  width: 300px;
  height: 30px;
  border-radius: 0px 0px 10px 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #adb5bd;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
