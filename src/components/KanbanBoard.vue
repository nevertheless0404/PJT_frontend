<template>
  <div>
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
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  data() {
    return {
      newTask: '',
      arrBacklog: [
        { name: '하루종일 숨쉬기' },
        { name: '침대에서 뒹굴거리기' },
        { name: '밥 잘먹기' }
      ],
      arrInProgress: [],
      arrDone: []
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
