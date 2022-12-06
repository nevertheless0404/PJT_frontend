<template>
  <div>
    {{ todo_list }}
    <!--todos 리스트 데이터에 체크된 인덱스 번호를 todo_lst에 저장하여 추후에 todos에 인덱스로 접근하여 complete 상태 변환해서 보내기-->
    <div class="card">
      <div class="card-body">
        <h1 style="font-size: 40px my-5">To Do List</h1>
        <div :key="idx" v-for="(todo, idx) in todos">
          <input
            type="checkbox"
            name=""
            id="html"
            :value="idx"
            v-model="todo_list"
            style="width: 25px; height: 25px"
          />
          <label class="ms-3" for="html" style="font-size: 30px"
            >{{ todo.title }} | {{ todo.project }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {}
}
</script>

<style scoped>
* {
  font-family: 'Dela Gothic One', cursive;
}
</style>
