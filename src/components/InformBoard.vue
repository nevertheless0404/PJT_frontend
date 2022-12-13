<template>
  <div class="mb-4">
    <div class="inform-head">
      <b-card-text>
        <p :key="id" v-if="informs" v-for="(s, id) in informs" class="mb-0">✔ {{s.name}}</p>
        <p v-if="(informsLen===0)">공지사항이 없습니다</p>
      </b-card-text>
    </div>
  </div>
</template>

<script>
import { informList } from '@/api/index'
export default {
  data() {
    return {
      informs: [],
      informsLen: 0
    }
  },
  created() {
    informList(this.$route.params.id)
    .then((response) => {
      for (const content of response.data[0].content.split(';')) {
        this.informs.push({name: content})
        this.informsLen = this.informs.length
      }
    })
  },
  methods: {
  }
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