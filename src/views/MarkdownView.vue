<template>
  <div>
    <NavProject />
    <div class="container mt-5 mb-5">
      <h1 class="title mb-4 text-center">Project markdown</h1>
      <v-md-editor v-model="message" height="750px"></v-md-editor>
      <button @click="[submitMd(), makeToast()]" class="btn1 ms-2 mb-5 float-end">수정</button>
      <button type="button" @click="doCopy" class="btn1 float-end">복사</button>
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
        message: '',
      };
    },
    created() {
      markdownGet(this.$route.params.id).then((response) => {
        this.message = response.data.content
      })
    },
    methods: {
      doCopy: function () {
        this.$copyText(this.message).then(function (e) {
          alert('클립보드에 복사했습니다')
        }, function (e) {
          alert('클립보드에 복사에 실패했습니다')
        })
      },
      async submitMd() {
        const update_markdown = {content: this.message}
        await markdownPut(this.$route.params.id, update_markdown)
      },
      makeToast(append = false) {
        alert(' 수정되었습니다')
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