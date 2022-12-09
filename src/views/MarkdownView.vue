<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
import { markdownGet } from '@/api/index'
  export default {
    data() {
      return {
        text: '',
      };
    },
    created() {
      markdownGet(this.$route.params.id).then((response) => {
        this.text = response.data.content
      })
    }
  };
</script>