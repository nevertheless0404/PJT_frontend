<template>
  <div class="container">
    <div>
      <div class="d-flex justify-content-between">
        <label for="exampleInputEmail1" class="form-label">프로젝트 팀원</label>
        <div class="d-flex mb-2">
          <div id="emailHelp" class="form-text me-2">
            <b-button size="sm" variant="outline-primary" @click="addMember"
              ><i class="bi bi-plus-lg"></i> 추가</b-button
            >
          </div>
          <div id="emailHelp" class="form-text">
            <b-button size="sm" variant="outline-danger" @click="removeMember"
              ><i class="bi bi-dash-lg"></i> 삭제</b-button
            >
          </div>
        </div>
      </div>
      <input
        type="email"
        class="form-control mb-3"
        id="exampleInputEmail1"
        placeholder="Email"
        aria-describedby="emailHelp"
        v-model="member.user"
        :key="id"
        v-for="(member, id) in members"
      />
    </div>
    <!-- <div v-html="memberHtml" v-if="isCreate" class="mb-3"></div> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      members: [
        {
          project: '',
          user: ''
        }
      ]
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    addMember() {
      this.members.push({
        user: ''
      })
      console.log(this.members)
    },
    removeMember() {
      if (this.members.length > 1) {
        this.members.splice(-1, 1)
      } else {
        this.members.splice(-1, 1)
        this.addMember()
      }
      console.log(this.members)
    }
  }
}
</script>

<style scoped></style>
