<template>
  <div class="mb-4">
    <div class="inform-head">
      <b-card-text>
        <div v-if="resInforms !== ''">
          <div :key="id" v-for="(s, id) in informs">
            <p class="mb-0" v-if="s.name">✔ {{ s.name }}</p>
          </div>
        </div>
        <div v-else>
        <p class="mb-0">공지사항이 없습니다</p>
        </div>
      </b-card-text>
    </div>
  </div>
</template>

<script>
import { informList } from '@/api/index'
export default {
  data() {
    return {
      informs: [{name: ''}],
      informsLen: 0,
      resInforms: ''
    }
  },
  created() {
    informList(this.$route.params.id).then((response) => {
      this.resInforms = response.data[0].content
      for (const content of response.data[0].content.split(';')) {
        if (content) {
          this.informs.push({ name: content })
          this.informsLen = this.informs.length
        }
      }
    })
  },
  methods: {}
}
</script>

<style scoped>
.inform-head {
  width: 100%;
  background-color: aliceblue;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
}
</style>
