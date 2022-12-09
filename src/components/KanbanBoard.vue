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
            v-model="arrBacklog"
            @change="refresh"
            ><div v-for="element in arrBacklog" :key="element.id">
              <button
                class="list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                @mousedown="pick_id(element)"
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
            v-model="arrInProgress"
            @change="refresh"
          >
            <div v-for="element in arrInProgress" :key="element.id">
              <button
                class="list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                @mousedown="pick_id(element)"
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
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
            v-model="arrDone"
            @change="refresh"
          >
            <div v-for="element in arrDone" :key="element.id">
              <button
                class="list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                @mousedown="pick_id(element)"
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
        <div class="d-block" v-if="!edit">
          <h3>{{ modalData.title }}</h3>
          <hr />
          <p>id : {{ modalData.id }}</p>
          <p>세부 내용 : {{ modalData.content }}</p>
          <p>기간 : {{ modalData.start_at }} - {{ modalData.end_at }}</p>
        </div>
        <form @submit.prevent="todoUpdate" v-if="edit">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >제목</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              v-model="updateData.title"
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
              v-model="updateData.content"
            />
          </div>
          <div class="mb-3">
            <label for="example-datepicker">할 일 시작일</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="updateData.start_at"
              :max="end_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="mb-3">
            <label for="example-datepicker2">할 일 종료일</label>
            <b-form-datepicker
              id="example-datepicker2"
              v-model="updateData.end_at"
              :min="start_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="mb-3">
            <label for="example-datepicker2">할 일 상태</label>
            <div class="radio d-flex">
              <div class="me-3">
                <input
                  class="radioInput1 btn-check"
                  type="radio"
                  name="options"
                  id="0"
                  value="0"
                  v-model="complete"
                  autocomplete="off"
                  checked
                />
                <label class="radioLabel1" for="0">Backlog</label>
              </div>
              <div class="me-3">
                <input
                  class="radioInput2 btn-check"
                  type="radio"
                  name="options"
                  id="1"
                  value="1"
                  v-model="complete"
                  autocomplete="off"
                />
                <label class="radioLabel2" for="1">InProgress</label>
              </div>
              <div>
                <input
                  class="radioInput3 btn-check"
                  type="radio"
                  name="options"
                  id="2"
                  value="2"
                  v-model="complete"
                  autocomplete="off"
                />
                <label class="radioLabel3" for="2">Done</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button @click="editCancle" v-if="edit" class="btn btn-secondary">
              Cancle
            </button>
            <button type="submit" v-if="edit" class="btn btn-primary">
              Edit Finish
            </button>
          </div>
        </form>
        <b-button
          v-if="!edit"
          class="mt-3"
          variant="outline-danger"
          block
          @click="hideModal"
          >Close Me</b-button
        >
        <b-button
          v-if="!edit"
          class="mt-3"
          variant="outline-primary"
          block
          @click="editModal"
          >Edit</b-button
        >
        <b-button
          v-if="!edit"
          class="mt-3"
          variant="outline-danger"
          block
          @click="deleteTodo"
          >Delete</b-button
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
import {
  todoCreate,
  todoList,
  todoPut,
  todoPutDrag,
  todoDel
} from '@/api/index'

let before_title,
  before_content,
  before_start_at,
  before_end_at,
  before_complete,
  drag_id,
  len_back,
  len_in,
  refresh_onetime = 0

export default {
  components: { draggable },
  data() {
    return {
      complete: '',
      newTask: {
        title: '',
        content: '',
        start_at: '',
        end_at: ''
      },
      arrBacklog: [],
      arrInProgress: [],
      arrDone: [],
      modalData: [
        {
          title: '',
          content: '',
          start_at: '',
          end_at: ''
        }
      ],
      updateData: [],
      edit: false
    }
  },
  setup() {},
  created() {
    todoList(this.$route.params.id) // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
      .then((response) => {
        console.log('response.data :', response.data)
        response.data.forEach((ele) => {
          if (ele.complete === 0) {
            this.arrBacklog.push({
              id: ele.id,
              project: ele.project,
              title: ele.title,
              content: ele.content,
              start_at: ele.start_at,
              end_at: ele.end_at,
              complete: 0
            })
          } else if (ele.complete === 1) {
            this.arrInProgress.push({
              id: ele.id,
              project: ele.project,
              title: ele.title,
              content: ele.content,
              start_at: ele.start_at,
              end_at: ele.end_at,
              complete: 1
            })
          } else {
            this.arrDone.push({
              id: ele.id,
              project: ele.project,
              title: ele.title,
              content: ele.content,
              start_at: ele.start_at,
              end_at: ele.end_at,
              complete: 2
            })
          }
        })
        len_back = this.arrBacklog.length
        len_in = this.arrInProgress.length
      }) // 성공하면 json 객체를 받아온다.
      .catch((error) => console.log(error))
    todoUpdate(this.$route.params.id)
  },
  mounted() {},
  unmounted() {},
  methods: {
    showModal(element) {
      this.$refs['my-modal'].show()
      this.modalData = element
      this.updateData = element
      before_title = this.modalData.title
      before_content = this.modalData.content
      before_start_at = this.modalData.start_at
      before_end_at = this.modalData.end_at
      before_complete = this.modalData.complete
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    async todoAdd() {
      this.updateData.title = ''
      this.updateData.content = ''
      this.updateData.start_at = ''
      this.updateData.end_at = ''
      this.updateData.complete = ''
      if (this.newTask) {
        this.arrBacklog.push({
          project: this.$route.params.id,
          title: this.newTask.title,
          content: this.newTask.content,
          start_at: this.newTask.start_at,
          end_at: this.newTask.end_at
        })
        const new_data = {
          title: this.newTask.title,
          content: this.newTask.content,
          start_at: this.newTask.start_at,
          end_at: this.newTask.end_at
        }
        await todoCreate(this.$route.params.id, new_data)
        console.log('이번 user :')
        this.newTask.title = ''
        this.newTask.content = ''
        this.newTask.start_at = ''
        this.newTask.end_at = ''
        this.$refs['modal'].hide()
      }
    },
    editModal() {
      this.edit = true
    },
    editCancle() {
      this.edit = false
      this.updateData.title = before_title
      this.updateData.content = before_content
      this.updateData.start_at = before_start_at
      this.updateData.end_at = before_end_at
      this.updateData.complete = before_complete
      this.$refs['my-modal'].hide()
    },
    todoUpdate() {
      this.updateData.complete = this.complete
      todoPut(this.$route.params.id, this.updateData)
      this.updateData.title = ''
      this.updateData.content = ''
      this.updateData.start_at = ''
      this.updateData.end_at = ''
      this.updateData.complete = ''
      this.$router.go()
      this.$refs['my-modal'].hide()
    },
    todoUpdateDrag() {
      this.updateData[0].complete = this.complete
      todoPutDrag(this.$route.params.id, this.updateData)
      // this.updateData.title = '555'
      // this.updateData.content = ''
      // this.updateData.start_at = ''
      // this.updateData.end_at = ''
      // this.updateData.complete = ''
      this.$router.go()
      this.$refs['my-modal'].hide()
    },
    deleteTodo() {
      todoDel(this.$route.params.id, this.modalData)
      this.$router.go()
      this.$refs['my-modal'].hide()
    },
    pick_id(ele) {
      drag_id = ele.id
      this.updateData.id = drag_id
      this.updateData.push({
        id: drag_id,
        complete: 4,
        title: ele.title,
        content: ele.content,
        start_at: ele.start_at,
        end_at: ele.end_at
      })
      this.updateData.complete = 8
    },
    refresh() {
      refresh_onetime += 1
      if (refresh_onetime < 2) {
        if (this.arrBacklog.length > len_back) {
          this.complete = '0'
        } else if (this.arrInProgress.length > len_in) {
          this.complete = '1'
        } else {
          this.complete = '2'
        }
        this.todoUpdateDrag()
      } else {
        refresh_onetime = 0
      }
    }
  }
}
</script>

<style scoped>
.kanban-column {
  min-height: 300px;
}
/* .radio {
  overflow: hidden;
  border-radius: 15px;
}*/
/* .radio input {
  display: none;
} */
.radioLabel1 {
  padding: 7px 16px;
  font-size: 14px;
  border: 1px solid rgb(172, 173, 177);
  cursor: pointer;
  transition: 0.3s;
  border-radius: 23px;
}
.radioLabel2 {
  padding: 7px 16px;
  font-size: 14px;
  border: 1px solid rgb(136, 176, 255);
  cursor: pointer;
  transition: 0.3s;
  border-radius: 23px;
}
.radioLabel3 {
  padding: 7px 16px;
  font-size: 14px;
  border: 1px solid rgb(168, 213, 192);
  cursor: pointer;
  transition: 0.3s;
  border-radius: 23px;
}
.radioInput1:checked + .radioLabel1 {
  background-color: rgb(216, 217, 220);
}
.radioInput2:checked + .radioLabel2 {
  background-color: rgb(211, 225, 252);
}
.radioInput3:checked + .radioLabel3 {
  background-color: rgb(217, 242, 229);
}
</style>
