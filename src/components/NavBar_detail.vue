<template>
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
          <li class="nav-item">
            <routerLink
              class="nav-link"
              :to="{ name: 'membercreate', params: pjtPk }"
              >팀원 초대</routerLink
            >
          </li>
          <li class="nav-item">
            <routerLink class="nav-link" :to="{ name: 'todo_project' }"
              >오늘 할 일</routerLink
            >
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

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto w-100 justify-content-between">
          <!-- project 드롭다운 버튼 -->
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>프로젝트</em>
            </template>
            <b-dropdown-item v-if="user">
              <routerLink class="nav-link" to="/project"
                >프로젝트 정보 수정</routerLink
              >
            </b-dropdown-item>
            <b-dropdown-item v-if="user">
              <routerLink class="nav-link" :to="{ name: 'todo_project' }"
              >오늘 할 일</routerLink
              >
            </b-dropdown-item>
            <b-dropdown-item v-if="user">
              <routerLink class="nav-link" :to="{ name: 'markdown' }"
              >마크다운 생성</routerLink
              >
            </b-dropdown-item>
            <div :v-if="(user.pk == resPk)">
              <b-dropdown-item v-if="user">
                <routerLink
                  class="nav-link"
                  :to="{ name: 'membercreate', params: pjtPk }"
                  >팀원 초대</routerLink
                >
              </b-dropdown-item>
              <b-dropdown-item v-if="user">
                <routerLink class="nav-link" :to="{ name: 'projectupdate' }"
                  >프로젝트 수정</routerLink
                >
              </b-dropdown-item>
              <b-dropdown-item v-if="user">
                <routerLink class="nav-link" :to="{ name: 'projectnotice' }"
                  >공지사항 수정</routerLink
                >
              </b-dropdown-item>
            </div>
          </b-nav-item-dropdown>

          <!-- user login 버튼 -->
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
</template>

<script>
import { mapGetters } from 'vuex'
import { projectGet } from '@/api/index'

export default {
  name: 'NavBar',
  props: ['childValue'],
  created() {
    projectGet(this.$route.params.id).then((response) => {
      this.resPk = response.data.id
    })
  },
  data() {
    return {
      pjtPk: this.childValue,
      resPk: ""
    }
  },
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
