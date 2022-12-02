<template>
  <div class="container">
    <div>
      <label for="exampleInputEmail1" class="form-label">프로젝트 팀원</label>
      <input
        type="email"
        class="form-control mb-3"
        id="exampleInputEmail1"
        placeholder="Email"
        aria-describedby="emailHelp"
        v-model="member.email"
        :key="id"
        v-for="(member, id) in members"
      />
      <div id="emailHelp" class="form-text">
        <button @click="addMember">+ 팀원 추가하기</button>
      </div>
      <div id="emailHelp" class="form-text">
        <button @click="removeMember">+ 팀원 삭제하기</button>
      </div>
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
          email: ''
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
        email: ''
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
