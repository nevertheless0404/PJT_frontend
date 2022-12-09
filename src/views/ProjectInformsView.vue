<template>
  <div>
    <NavBar_detail />
    <div v-if="this.$router" class="container">
      <p>{{ $route.params.id }}</p>
      <form @submit.prevent="submitinform">
        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label for="exampleFormControlInput1" class="form-label"
              >공지사항</label
            >
            <div class="d-flex mb-2">
              <div id="exampleFormControlInput1" class="me-2">
                <b-button size="sm" variant="outline-primary" @click="addInform"
                  ><i class="bi bi-plus-lg"></i> 추가</b-button
                >
              </div>
              <div id="exampleFormControlInput1" class="">
                <b-button
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
            placeholder="Tech stack"
            v-model="s.name"
            :key="id"
            v-for="(s, id) in inform"
          />
        </div>
        <button type="submit" class="btn btn-primary">저장</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar_detail from '@/components/NavBar_detail.vue'
import { informCreate } from '@/api/index'

export default {
  components: { NavBar_detail },
  data() {
    return {
      content: '',
      inform: [{ name: '' }]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    async submitinform() {
      let stringInform = ''
      this.inform.forEach((ele) => {
        stringInform += ele.name + ' '
      })

      const informData = {
        id: this.$route.params.id,
        content: stringInform
      }
      await informCreate(this.$route.params.id, informData)
    },
    addInform() {
      this.inform.push({
        name: ''
      })
      console.log(this.inform)
    },
    removeInform() {
      if (this.inform.length > 1) {
        this.inform.splice(-1, 1)
      } else {
        this.inform.splice(-1, 1)
        this.addInform()
      }
      console.log(this.inform)
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-family: 'Dela Gothic One', cursive;
}

</style>
