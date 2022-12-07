<template>
  <div>
    <!-- <nav class="navbar navbar-expand-lg bg-light sticky-top">
      <div class="container-fluid px-5">
        <routerLink class="navbar-brand" :to="{ name: 'projectindex' }">
          <img src="@/assets/images/logo.png" width="120px" />
        </routerLink>
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
        <div
          class="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNav"
        >
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
            <li class="nav-item">
              <routerLink class="nav-link" to="/project">프로젝트</routerLink>
            </li>
          </ul>
        </div>
      </div>
    </nav> -->
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" class="px-5">
        <b-navbar-brand :to="{ name: 'projectindex' }"
          ><img src="@/assets/images/logo.png" width="120px"
        /></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="d-flex justify-content-end">
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ user.email }}</em>
              </template>
              <b-dropdown-item v-if="!user">
                <routerLink class="nav-link" to="/login">Login</routerLink>
              </b-dropdown-item>
              <b-dropdown-item v-if="!user">
                <routerLink class="nav-link" to="/signup">Signup</routerLink>
              </b-dropdown-item>
              <b-dropdown-item v-if="user">
                <a
                  class="nav-link"
                  href="javascript:void(0)"
                  @click="handleClick"
                >
                  로그아웃
                </a>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
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
