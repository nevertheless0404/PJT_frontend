<template>
  <div>
    <div>
      <i v-b-toggle.my-sidebar class="bi bi-bell position-relative">
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ noCnt }}
        </span>
      </i>
    </div>

    <b-sidebar id="my-sidebar" title="알림" shadow>
      <div class="mt-3">
        <i
          v-b-toggle.my-sidebar
          variant="outline-danger"
          block
          class="bi bi-x-lg"
          style="
            font-size: 25px;
            cursor: pointer;
            position: absolute;
            left: 275px;
            top: 28px;
          "
        ></i>
        <hr />
        <div class="px-3 py-2">
          <div :key="idx" v-for="(c, idx) in comment">
            <p @click="isRead" class="text-decoration-none" style="cursor:pointer">
              <span class="fw-bold" :data-id="c[2]" :todo-id="c[4]">{{ c[0] }}</span> <span :data-id="c[1]" :todo-id="c[4]">님이 </span>
              <span class="fw-bold" :data-id="c[2]" :todo-id="c[4]">{{ c[3] }}</span> <span :data-id="c[1]" :todo-id="c[4]"> 프로젝트에 댓글을</span>
              <span :data-id="c[2]" :todo-id="c[4]"> 달았습니다.</span>
            </p>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { NotificationGet } from '@/api/index'
import { isRead } from '@/api/index'

export default {
  name: 'AlarmBell',
  data() {
    return {
      noCnt: '',
      comment: [],
      notificationPk: ''
    }
  },
  created() {
    NotificationGet().then((response) => {
      console.log(response)
      this.noCnt = response.data.length
      for (let i = 0; i < response.data.length; i++) {
        this.comment.push([
          response.data[i].send_user.email,
          response.data[i].project.id,
          response.data[i].id,
          response.data[i].project.title,
          response.data[i].todo.id
        ])
      }
    })
  },
  methods: {
    clickRouter(dataId, todoId) {
      this.$router.push(
        {
          name: 'projectdetail',
          params: {id:dataId},
          hash: `#${todoId}`
        }
      )
    },
    async isRead(event) {
      const dataId = event.target.getAttribute('data-id')
      const todo = event.target.getAttribute('todo-id')
      await isRead(dataId)
      this.clickRouter(dataId, todo)
    }
  }
}
</script>

<style>
.b-sidebar:not(.b-sidebar-right) > .b-sidebar-header .close {
  display: none !important;
}

.b-sidebar > .b-sidebar-header {
  margin-top: 20px;
}
</style>
