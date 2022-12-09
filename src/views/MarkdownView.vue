<template>
  <div>
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-5">
      <h1 class="mb-3 text-center">프로젝트 마크다운 생성기</h1>
      <v-md-editor v-model="text" height="400px"></v-md-editor>
    </div>
  </div>
</template>

<script>
import NavProject from '@/components/NavBar_detail.vue'
import { markdownGet } from '@/api/index'

  export default {
    components: { NavProject },
    data() {
      return {
        text: '',
      };
    },
    created() {
      markdownGet(this.$route.params.id).then((response) => {
        this.text = response.data.content
      })
      console.log('웨안돼ㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐ')
    }
  };
</script>