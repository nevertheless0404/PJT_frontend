<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <routerLink class="navbar-brand" to="/">Navbar</routerLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="!user">
          <li class="nav-item">
            <routerLink class="nav-link" to="/login">로그인</routerLink>
          </li>
          <li class="nav-item">
            <routerLink class="nav-link" to="/signup">회원가입</routerLink>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="user">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="handleClick"
              >로그아웃</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  methods: {
    handleClick() {
      localStorage.removeItem('access_token')
      this.$store.dispatch('user', null)
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
