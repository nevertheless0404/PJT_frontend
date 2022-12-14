<template>
  <div>
    <NavBar_detail />
    <div class="container">
      <form @submit.prevent="putinform" v-if="responseLen">
        <div class="m-3">
          <h1 class="title text-center">Notice</h1>
          <div class="d-flex justify-content-end">
            <div class="d-flex m-2">
              <div id="exampleFormControlInput1" class="me-2">
                <b-button class="btn2" size="sm" variant="outline-primary" @click="addInform"
                  ><i class="bi bi-plus-lg"></i> 추가</b-button
                >
              </div>
              <div id="exampleFormControlInput1" class="">
                <b-button
                  class="btn3"
                  size="sm"
                  variant="outline-danger"
                  @click="removeInform"
                  ><i class="bi bi-dash-lg"></i> 삭제</b-button
                >
              </div>
            </div>
          </div>
          <textarea
            type="text"
            class="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Notice"
            v-model="s.name"
            :key="id"
            v-for="(s, id) in inform"
          />
        </div>
        <button type="submit" class="btn1 float-end">수정</button>
      </form>
      <form @submit.prevent="submitinform" v-if="(responseLen===0)">
        <div class="m-3">
          <h1 class="title text-center">Notice</h1>
          <div class="d-flex justify-content-end">
            <div class="d-flex mb-2">
              <div id="exampleFormControlInput1" class="me-2">
                <b-button class="btn2" size="sm" variant="outline-primary" @click="addInform"
                  ><i class="bi bi-plus-lg"></i> 추가</b-button
                >
              </div>
              <div id="exampleFormControlInput1" class="">
                <b-button
                  class="btn3"
                  size="sm"
                  variant="outline-danger"
                  @click="removeInform"
                  ><i class="bi bi-dash-lg"></i> 삭제</b-button
                >
              </div>
            </div>
          </div>
          <textarea
            type="text"
            class="form-control mb-3"
            id="exampleFormControlInput1"
            placeholder="Notice"
            v-model="s.name"
            :key="id"
            v-for="(s, id) in inform"
          />
        </div>
        <button type="submit" class="btn1 float-end">저장</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar_detail from '@/components/NavBar_detail.vue'
import { informCreate } from '@/api/index'
import { informList } from '@/api/index'
import { InformPut } from '@/api/index'

export default {
  components: { NavBar_detail },
  data() {
    return {
      content: '',
      inform: [],
      responseLen: 0
    }
  },
  setup() {},
  created() {
    informList(this.$route.params.id)
    .then((response) => {
      this.responseLen = response.data.length
      for (const resContent of response.data[0].content.split(';')) {
        this.inform.push({name: resContent})
      }
    })
  },
  mounted() {},
  unmounted() {},
  methods: {
    async submitinform() {
      let stringInform = ''
      this.inform.forEach((ele) => {
        stringInform += ele.name + ';'
      })
      stringInform = stringInform.substr(0, stringInform.length-1)

      const informData = {
        id: this.$route.params.id,
        content: stringInform
      }
      await informCreate(this.$route.params.id, informData)
      this.$router.push({ name: 'projectdetail', params: {id: this.$route.params.id} })
    },
    async putinform() {
      let stringContent = ''
      this.inform.forEach((ele) => {
        stringContent += ele.name + ';'
      })
      stringContent = stringContent.substr(0, stringContent.length-1)
      const informData = {
        id: this.$route.params.id,
        content: stringContent
      }

      await InformPut(this.$route.params.id, informData)
      this.$router.push({ name: 'projectdetail', params: {id: this.$route.params.id} })
    },
    addInform() {
      this.inform.push({
        name: ''
      })
      console.log('add되는거 아님?', this.inform)
    },
    removeInform() {
      if (this.inform.length > 1) {
        this.inform.splice(-1, 1)
      } else {
        this.inform.splice(-1, 1)
        this.addInform()
      }
    }
  }
}
</script>

<style scoped>

.title{
  font-family: 'Dela Gothic One', cursive;
}

.btn1 {
  margin-right: 20px;
  color: white;
  background-color: #3485FF;
  box-shadow: 5px 9px 16px 0px #3485FF;
  width: 70px;
  height: 35px;
  border-radius: 3px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.8s cubic-bezier(.5, .24, 0, 1)
}

.btn1:hover {

  box-shadow: inset 300px 0px 0px 0px #FFC062;
}


.btn2 {
  color: white;
  background-color: #3485FF;
  width: 70px;
  height: 31px;
  border-radius: 3px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.2s cubic-bezier(.5, .24, 0, 1)
}

.btn2:hover {

  box-shadow: inset 70px 0px 0px 0px #FFC062;
}


.btn3 {
  color: white;
  background-color: #F24E1E;
  box-shadow: 5px 9px 16px 0px #F24E1E;
  width: 70px;
  height: 31px;
  border-radius: 3px;
  border: #D9D9D9 solid 0px;
  text-decoration: none;
  text-align : center;
  padding: 5px;

  box-shadow: inset 0px 0px 0px #FFC062;
  display: block;
  -webkit-transition: all 0.8s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.2s cubic-bezier(.5, .24, 0, 1)
}

.btn3:hover {

  box-shadow: inset 300px 0px 0px 0px #FFC062;
}


</style>