<template>
  <div>
    <div>
      <b-navbar
        toggleable="lg"
        type="light"
        variant="light"
        class="px-5 d-flex justify-content-between"
      >
        <b-navbar-brand :to="{ name: 'projectindex' }"
          ><img src="@/assets/images/logo.png" width="120px"
        /></b-navbar-brand>
        <div class="d-flex">
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em v-if="user">
                  {{ user.email }}
                </em>
                <em v-if="!user"> Login | Signup </em>
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
          <div
            class="d-flex align-items-center justify-content-center mx-3 pt-1"
          >
            <AlarmBell />
          </div>
        </div>
        <!-- </b-collapse> -->
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AlarmBell from '@/components/AlarmBell.vue'

export default {
  name: 'NavBar',
  components: { AlarmBell },
  methods: {
    handleClick() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.$store.dispatch('user', null)
      this.$router.push('/')
    },
    btnClick() {
      const pTag = document.querySelector('#ptag')
      pTag.style.display = ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
