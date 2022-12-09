<template>
<div>
  <div class="mb-3">
    <i v-b-toggle.my-sidebar class="bi bi-bell position-relative">
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ noCnt }}
      </span>
    </i>
  </div>

  <b-sidebar id="my-sidebar" title="알림" shadow>
    <div class="px-3 py-2">
      <p v-for="c in comment">
        <router-link :to="{ name: 'projectdetail', params: {id: c[1]}}"><p @click="isRead" :data-id=c[2]>{{c[0]}} 님이 댓글을 달았습니다.</p></router-link>
      </p>
    </div>
  </b-sidebar>
</div>
</template>

<script>
import { NotificationGet } from '@/api/index'
import { isRead } from '@/api/index'

  export default{
    name: 'AlarmBell',
    data() {
      return {
        noCnt : '',
        comment : [],
        notificationPk : ''
      }
    },
    created() {
      NotificationGet()
      .then((response) => {
        console.log(response.data)
        this.noCnt = response.data.length
        for (let i=0; i < response.data.length; i++) {
          this.comment.push([response.data[i].send_user.email, response.data[i].project.id, response.data[i].id])
          console.log(this.comment)
        }
      })
    },
    methods: {
      async isRead(event) {
        const dataId = event.target.getAttribute('data-id')
        console.log(dataId)

        await isRead(dataId)
      }
    }
  }
</script>