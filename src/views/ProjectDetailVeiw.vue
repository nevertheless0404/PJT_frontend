<template>
  <div>
    url로 받은 id 값 : {{ $route.params.id }}
    <NavProject v-bind:childValue="pjtPk" />
    <div class="container mt-4">
      <ProjectCalender />
      <div class="row">
        <div class="col form-inline">
          <b-form-input
            v-model="newTask"
            aria-placeholder="Enter Task"
            @keyup.enter="add"
          ></b-form-input>
          <b-button variant="primary">Add</b-button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="p-2 alert alert-secondary">
            <h3>Backlog</h3>
            <draggable class="list-group" :list="arrBacklog" group="tasks">
              <div
                class="list-group-item"
                v-for="element in arrBacklog"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavProject from '@/components/NavBar_detail.vue'
import ProjectCalender from '@/components/ProjectCalender.vue'
import draggable from 'vuedraggable'

export default {
  components: { ProjectCalender, draggable, NavProject },
  data() {
    return {
      props: '$route.params.id',
      newTask: '',
      arrBacklog: [
        { name: '하루종일 숨쉬기' },
        { name: '침대에서 뒹굴거리기' },
        { name: '밥 잘먹기' }
      ],
      arrInProgress: [],
      arrDone: [],
      pjtPk: this.$route.params.id
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    add() {
      if (this.newTask) {
        this.arrBacklog.push({ name: this.newTask })
        this.newTask = ''
      }
    }
  }
}
</script>

<style scoped></style>
