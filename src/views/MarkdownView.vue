<template>
  <div>
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-5">
      <h1 class="mb-3 text-center">프로젝트 마크다운 생성기</h1>
      <v-md-editor v-model="text" height="400px"></v-md-editor>
      <button @click="[submitMd(), makeToast()]" class="btn btn-primary mt-4 float-end">수정</button>

    </div>
  </div>
</template>

<script>
import NavProject from '@/components/NavBar_detail.vue'
import { markdownGet } from '@/api/index'
import { markdownPut } from '@/api/index'

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
    },
    methods: {
      async submitMd() {
        const update_markdown = {content: this.text}
        await markdownPut(this.$route.params.id, update_markdown)
      },
      makeToast(append = false) {
        this.$bvToast.toast(`마크다운이 수정되었습니다`, {
          autoHideDelay: 555555555000,
          appendToast: append
        })
      }
    }
  };
</script>