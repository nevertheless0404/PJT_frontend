<template>
  <div class="mt-4">
    <div class="row">
      <div class="col d-flex">
        <!-- <b-form-input
          v-model="newTask.title"
          placeholder="Enter Task"
          @keyup.enter="add"
        ></b-form-input> -->
        <b-button class="ms-2" variant="primary" v-b-modal.modal-prevent-closing
          >Add</b-button
        >
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="p-2 alert alert-secondary">
          <h3>Backlog</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrBacklog"
            group="tasks"
            ><div v-for="(element, idx) in arrBacklog" :key="idx">
              <button
                class="list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                v-if="element.title"
              >
                {{ element.title }}<br />
                {{ element.start_at }} - {{ element.end_at }}
              </button>
            </div>
          </draggable>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
          >
            <div v-for="(element, idx) in arrInProgress" :key="idx">
              <button
                class="list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                v-if="element.title"
              >
                {{ element.title }}
              </button>
            </div>
          </draggable>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
          >
            <div v-for="(element, idx) in arrDone" :key="idx">
              <button
                class="list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                v-if="element.title"
              >
                {{ element.title }}<br />
                {{ element.start_at }} - {{ element.end_at }}
              </button>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <div>
      <!-- 칸반보드 디테일 모달 -->
      <b-modal ref="my-modal" hide-footer hide-header>
        <div class="d-block">
          <h3>{{ modalData.title }}</h3>
          <hr />
          <p>세부 내용 : {{ modalData.content }}</p>
          <p>기간 : {{ modalData.start_at }} - {{ modalData.end_at }}</p>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
          >Close Me</b-button
        >
      </b-modal>

      <!-- 칸반보드 작성 모달 -->
      <b-modal id="modal-prevent-closing" ref="modal" hide-header hide-footer
        ><h3>칸반보드 작성</h3>
        <hr />
        <!-- <form ref="form" @submit.stop.prevent="handleSubmit"> -->
        <form @submit.prevent="todoAdd">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >제목</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              v-model="newTask.title"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >내용</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              v-model="newTask.content"
            />
          </div>
          <div class="mb-3">
            <label for="example-datepicker">할 일 시작일</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="newTask.start_at"
              :max="end_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="mb-3">
            <label for="example-datepicker2">할 일 종료일</label>
            <b-form-datepicker
              id="example-datepicker2"
              v-model="newTask.end_at"
              :min="start_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">추가하기</button>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  data() {
    return {
      newTask: [
        {
          title: '',
          content: '',
          start_at: '',
          end_at: ''
        }
      ],
      arrBacklog: [{ title: '', content: '', start_at: '', end_at: '' }],
      arrInProgress: [],
      arrDone: [],
      modalData: []
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    showModal(element) {
      this.$refs['my-modal'].show()
      console.log('element: ', element)
      this.modalData = element
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    todoAdd() {
      if (this.newTask) {
        this.arrBacklog.push({
          title: this.newTask.title,
          content: this.newTask.content,
          start_at: this.newTask.start_at,
          end_at: this.newTask.end_at
        })
        console.log('이번 투두 :', this.arrBacklog)
        this.newTask.title = ''
        this.newTask.content = ''
        this.newTask.start_at = ''
        this.newTask.end_at = ''
        this.$refs['modal'].hide()
      }
    },
    add() {}
  },
  createModal() {}
}
</script>

<style scoped>
.kanban-column {
  min-height: 300px;
}
</style>
