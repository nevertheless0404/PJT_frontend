<template>
  <div class="mt-4">
    <div class="row">
      <div class="col d-flex">
        <!-- <b-form-input
          v-model="newTask.title"
          placeholder="Enter Task"
          @keyup.enter="add"
        ></b-form-input> -->
        <div class="btn1" variant="primary" v-b-modal.modal-prevent-closing>
          <i class="bi bi-plus-lg"></i>&nbsp;할 일 추가
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="p-2 alert alert-warning">
          <h3>시작 전</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrBacklog"
            group="tasks"
            v-model="arrBacklog"
            @change="refresh"
            ><div v-for="element in arrBacklog" :key="element.id">
              <!-- 칸반보드 요소들 -->
              <!-- <div class="sdfsdf" @mouseenter="cursor(element)" :class="{cursorNot : isCursor}"> -->
              <button
                class="todo list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                @mousedown="pick_id(element)"
                v-if="element.title"
              >
                <div
                  class="d-flex justify-content-between"
                  style="margin: 8px 0px"
                >
                  <p class="todoTitle">{{ element.title }}</p>
                  <!-- 유저 이름 -->
                  <div class="avatar">{{ element.user_s }}</div>
                </div>
                <p class="m-0" style="font-size: 14px">
                  {{ element.start_at }} - {{ element.end_at }}
                </p>
              </button>
            </div>
          </draggable>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-2 alert alert-primary">
          <h3>진행중</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
            v-model="arrInProgress"
            @change="refresh"
          >
            <div v-for="element in arrInProgress" :key="element.id">
              <button
                class="todo list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                @mousedown="pick_id(element)"
                v-if="element.title"
              >
                <div
                  class="d-flex justify-content-between"
                  style="margin: 8px 0px"
                >
                  <p class="todoTitle">{{ element.title }}</p>
                  <!-- 유저 이름 -->
                  <div class="avatar">{{ element.user_s }}</div>
                </div>
                <p class="m-0" style="font-size: 14px">
                  {{ element.start_at }} - {{ element.end_at }}
                </p>
              </button>
            </div>
          </draggable>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-2 alert alert-success">
          <h3>완료됨</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
            v-model="arrDone"
            @change="refresh"
          >
            <div v-for="element in arrDone" :key="element.id">
              <button
                class="todo list-group-item text-start w-100 rounded-2"
                id="show-btn"
                @click="showModal(element)"
                @mousedown="pick_id(element)"
                v-if="element.title"
              >
                <div
                  class="d-flex justify-content-between"
                  style="margin: 8px 0px"
                >
                  <p class="todoTitle">{{ element.title }}</p>
                  <!-- 유저 이름 -->
                  <div class="avatar">{{ element.user_s }}</div>
                </div>
                <p class="m-0" style="font-size: 14px">
                  {{ element.start_at }} - {{ element.end_at }}
                </p>
              </button>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <div>
      <!-- 칸반보드 디테일 모달 -->
      <b-modal
        ref="my-modal"
        hide-footer
        hide-header
        no-close-on-backdrop
        no-close-on-esc
      >
        <div class="d-block" v-if="!edit">
          <div class="d-flex justify-content-between">
            <div class="">
              <h3 class="m-0" style="word-break: break-all">
                {{ modalData.title }}
              </h3>
              <p
                class="mt-1 mb-0"
                style="font-weight: 500; color: rgb(110 110 110);"
              >
                {{ modalData.user_s }}의 할 일
              </p>
            </div>
            <i
              v-if="!edit"
              variant="outline-danger"
              block
              @click="hideModal"
              class="bi bi-x-lg ms-3"
              style="font-size: 25px; cursor: pointer"
            ></i>
          </div>
          <hr />
          <p class="mb-1" style="color: gray">설명</p>
          <p class="mb-3">{{ modalData.content }}</p>
          <p class="mb-1" style="color: gray">기간</p>
          <p style="font-size: 17px">
            {{ modalData.start_at }} - {{ modalData.end_at }}
          </p>
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
              :max="updateData.end_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="mb-3">
            <label for="example-datepicker2">할 일 종료일</label>
            <b-form-datepicker
              id="example-datepicker2"
              v-model="updateData.end_at"
              :min="updateData.start_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>

          <!-- 라디오 버튼 -->
          <div class="mb-3">
            <b-form-group label="할 일 상태" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                id="btn-radios-2"
                v-model="updateData.complete"
                :options="options"
                :aria-describedby="ariaDescribedby"
                button-variant="outline-success"
                size="lg"
                name="radio-btn-outline"
                buttons
              ></b-form-radio-group>
            </b-form-group>
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
        <div class="d-flex" v-if="user.email === modalData.user">
          <b-button
            size="sm"
            v-if="!edit"
            class="mt-3 me-2"
            variant="outline-primary"
            block
            @click="editModal"
            ><i class="bi bi-pencil"></i
          ></b-button>
          <b-button
            size="sm"
            v-if="!edit"
            class="mt-3"
            variant="outline-danger"
            block
            @click="deleteTodo"
            ><i class="bi bi-trash3"></i
          ></b-button>
        </div>
        <div v-if="!edit">
          <hr />
          <p>댓글</p>
          <form @submit.prevent="submitComment" class="row justify-content-end">
            <input
              type="text"
              v-model="comment"
              class="col-auto form-control mb-3"
            />
            <button type="submit" class="col-auto btn btn-primary mb-3">
              댓글
            </button>
          </form>
          <div
            :key="id"
            v-for="(c, id) in comments"
            class="row"
            style="justify-content: flex-end"
          >
            <p class="col">{{ c.user }}</p>
            <p class="col">{{ c.comment }}</p>
            <p class="col">{{ c.created_at }}</p>
          </div>
        </div>
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
              :state="validation"
            />
            <b-form-invalid-feedback :state="validation">
              제목은 30자 이내로 작성해 주세요.
            </b-form-invalid-feedback>
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
              :max="newTask.end_at"
              class="mb-2"
            ></b-form-datepicker>
          </div>
          <div class="mb-3">
            <label for="example-datepicker2">할 일 종료일</label>
            <b-form-datepicker
              id="example-datepicker2"
              v-model="newTask.end_at"
              :min="newTask.start_at"
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
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import {
  todoCreate,
  todoList,
  todoPut,
  todoPutDrag,
  todoDel,
  commentCreate,
  commentList
} from '@/api/index'

let before_title,
  before_content,
  before_start_at,
  before_end_at,
  before_complete,
  drag_id,
  len_back,
  len_in,
  len_done,
  refresh_onetime = 0,
  user_s

export default {
  components: { draggable },
  data() {
    return {
      isCursor: false,
      complete: '',
      user_s: '',
      newTask: {
        title: '',
        content: '',
        start_at: '',
        end_at: '',
        user: ''
      },
      arrBacklog: [],
      arrInProgress: [],
      arrDone: [],
      modalData: [
        {
          id: '',
          title: '',
          content: '',
          start_at: '',
          end_at: '',
          user_s: '',
          user: '',
          complete: ''
        }
      ],
      updateData: [],
      edit: false,
      options: [
        { text: 'Backlog', value: 0 },
        { text: 'In Progress', value: 1 },
        { text: 'Done', value: 2 }
      ],
      comment: '',
      comments: []
    }
  },
  setup() {},
  created() {
    todoList(this.$route.params.id) // 위에서 임포트한 통신 메소드이다. 렌더링시 생성(created)되도록 만든다.
      .then((response) => {
        response.data.forEach((ele) => {
          if (ele.complete === 0) {
            this.arrBacklog.push({
              id: ele.id,
              project: ele.project,
              title: ele.title,
              content: ele.content,
              start_at: ele.start_at,
              end_at: ele.end_at,
              user_s: ele.user.split('@')[0],
              user: ele.user,
              complete: ele.complete
            })
            // this.modalData.complete = ele.complete
          } else if (ele.complete === 1) {
            this.arrInProgress.push({
              id: ele.id,
              project: ele.project,
              title: ele.title,
              content: ele.content,
              start_at: ele.start_at,
              end_at: ele.end_at,
              user_s: ele.user.split('@')[0],
              user: ele.user,
              complete: ele.complete
            })
            // this.modalData.complete = ele.
          } else {
            this.arrDone.push({
              id: ele.id,
              project: ele.project,
              title: ele.title,
              content: ele.content,
              start_at: ele.start_at,
              end_at: ele.end_at,
              user_s: ele.user.split('@')[0],
              user: ele.user,
              complete: ele.complete
            })
            // this.modalData.complete = ele.complete
          }
        })
        console.log('제발스', this.complete)
        len_back = this.arrBacklog.length
        len_in = this.arrInProgress.length
        len_done = this.arrDone.length
      }) // 성공하면 json 객체를 받아온다.
      .catch((error) => console.log(error))
    todoUpdate(this.$route.params.id)
  },
  mounted() {},
  unmounted() {},
  methods: {
    async submitComment() {
      const new_comment = this.comment
      await commentCreate(this.$route.params.id, this.modalData.id, {
        comment: new_comment
      })
      commentList(this.$route.params.id, this.modalData.id).then((response) => {
        console.log(response)
        this.comments = response.data
      })
      this.comment = ''
    },
    showModal(element) {
      console.log('element.id :', element.id)
      this.$refs['my-modal'].show()
      this.modalData = element
      this.updateData = element
      this.modalData.id = element.id
      before_title = this.modalData.title
      before_content = this.modalData.content
      before_start_at = this.modalData.start_at
      before_end_at = this.modalData.end_at
      before_complete = this.modalData.complete
      console.log('modalData.id :', this.modalData.id)
      commentList(this.$route.params.id, this.modalData.id).then((response) => {
        console.log(response)
        this.comments = response.data
      })
      console.log('modalData.id after :', this.modalData.id)
      console.log('업데이트데이터', this.updateData)
    },
    hideModal() {
      this.$refs['my-modal'].hide()
      this.$parent.forceRerender()
    },
    async todoAdd() {
      this.updateData.title = ''
      this.updateData.content = ''
      this.updateData.start_at = ''
      this.updateData.end_at = ''
      this.updateData.complete = ''
      if (this.newTask && this.newTask.title.length < 30) {
        this.arrBacklog.push({
          project: this.$route.params.id,
          title: this.newTask.title,
          content: this.newTask.content,
          start_at: this.newTask.start_at,
          end_at: this.newTask.end_at,
          user_s: this.user.email.split('@')[0]
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
      this.$parent.calendarRefresh()
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
      // this.$refs['my-modal'].hide()
    },
    async todoUpdate() {
      // this.updateData[0].complete = this.complete
      await todoPut(this.$route.params.id, this.updateData)
      this.updateData = []
      this.$router.go()
      this.$refs['my-modal'].hide()
      len_back = this.arrBacklog.length
      len_in = this.arrInProgress.length
      len_done = this.arrDone.length
      this.$parent.calendarRefresh()
      this.$parent.forceRerender()
    },
    async todoUpdateDrag() {
      this.updateData[0].complete = this.complete
      await todoPutDrag(this.$route.params.id, this.updateData)
      len_back = this.arrBacklog.length
      len_in = this.arrInProgress.length
      len_done = this.arrDone.length
      this.$parent.calendarRefresh()
      this.$parent.forceRerender()
    },
    deleteTodo() {
      todoDel(this.$route.params.id, this.modalData)
      this.$router.go()
      this.$refs['my-modal'].hide()
      this.$parent.calendarRefresh()
      this.$parent.forceRerender()
    },
    pick_id(ele) {
      drag_id = ele.id
      this.updateData.id = drag_id
      this.updateData.push({
        id: drag_id,
        complete: '',
        title: ele.title,
        content: ele.content,
        start_at: ele.start_at,
        end_at: ele.end_at
      })
    },
    refresh() {
      refresh_onetime += 1
      if (refresh_onetime < 2) {
        if (this.arrBacklog.length > len_back) {
          this.complete = 0
          this.todoUpdateDrag()
        } else if (this.arrInProgress.length > len_in) {
          this.complete = 1
          this.todoUpdateDrag()
        } else if (this.arrDone.length > len_done) {
          this.complete = 2
          this.todoUpdateDrag()
        }
      } else {
        refresh_onetime = 0
      }
    }
    // cursor(element) {
    //   if (this.user.email != element.user){
    //     this.isCursor = true
    //     console.log('어케되는거니?', this.isCursor)
    //   }
    //   else {
    //     this.isCursor = false
    //     console.log('어케되는거니?', this.isCursor)
    //   }
    // }
  },
  computed: {
    ...mapGetters(['user']),
    validation() {
      return this.newTask.title.length < 30
    }
  }
}
</script>

<style scoped>
.kanban-column {
  min-height: 300px;
}

.todoTitle {
  font-size: 18px;
  font-weight: 600;
  word-break: break-all;
  /* margin: 8px 0px; */
  color: rgb(54, 54, 54);
}

.avatar {
  font-size: 13px;
  color: #ababab;
  font-weight: 600;
  letter-spacing: -0.5px;
  padding: 3px 5px;
}

.todo {
  overflow: hidden;
}


.btn1 {
  display: flex;
  color: white;
  background-color: #3485ff;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 150px;
  height: 40px;
  border-radius: 10px;
  border: #d9d9d9 solid 0px;
  text-decoration: none;
  text-align : center;
  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  -webkit-transition: all 1.8s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 1.8s cubic-bezier(0.5, 0.24, 0, 1);
}

.btn1:hover {
  box-shadow: inset 1600px 0px 0px 0px #ffc062;
}

.cursorNot {
  cursor: not-allowed;
}
</style>
