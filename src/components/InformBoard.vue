<template>
  <div>
    <p :key="id" v-for="(s, id) in informs">{{s.name}}</p>
  </div>
</template>

<script>
import { informList } from '@/api/index'
export default {
  data() {
    return {
      informs: [],
    }
  },
  created() {
    informList(this.$route.params.id)
    .then((response) => {
      for (const content of response.data[0].content.split(' ')) {
        this.informs.push({name: content})
      }
    })
  },
  methods: {
  }
}
</script>