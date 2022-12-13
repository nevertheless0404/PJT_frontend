<template>
  <div>
    <NavProject />
    <div class="container mt-5">
      <h1 class="title mb-4 text-center">Project markdown</h1>
      <v-md-editor v-model="text" height="750px"></v-md-editor>
      <button @click="[submitMd(), makeToast()]" class="btn1 float-end">수정</button>
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
<style scoped>

.title{
  font-family: 'Dela Gothic One', cursive;
}
.btn1 {
  margin-top: 15px;
  color: white;
  background-color: #3485FF;
  box-shadow: 5px 9px 16px 0px #0d224216;
  width: 50px;
  height: 40px;
  border-radius: 10px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.btn1:hover {

  box-shadow: inset 300px 0px 0px 0px #FFC062;
}
</style>