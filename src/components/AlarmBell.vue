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
          <p :key="idx" v-for="(c, idx) in comment">
            <router-link :to="{ name: 'projectdetail', params: { id: c[1] } }"
              ><p @click="isRead" :data-id="c[2]" class="text-decoration-none">
                <span class="fw-bold">{{ c[0] }}</span> 님이
                <span class="fw-bold">{{ c[3] }}</span> 프로젝트에 댓글을
                달았습니다.
              </p></router-link
            >
          </p>
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
      this.noCnt = response.data.length
      for (let i = 0; i < response.data.length; i++) {
        this.comment.push([
          response.data[i].send_user.email,
          response.data[i].project.id,
          response.data[i].id,
          response.data[i].project.title
        ])
      }
    })
  },
  methods: {
    async isRead(event) {
      const dataId = event.target.getAttribute('data-id')
      await isRead(dataId)
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
