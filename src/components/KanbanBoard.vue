<template>
  <div class="mt-4">
    <div class="row">
      <div class="col d-flex">
        <b-form-input
          v-model="newTask.title"
          placeholder="Enter Task"
          @keyup.enter="add"
        ></b-form-input>
        <b-button class="ms-2" variant="primary" @click="add">Add</b-button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="p-2 alert alert-secondary">
          <h3>Backlog</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrBacklog"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="(element, idx) in arrBacklog"
              :key="idx"
              v-b-modal.my-modal
            >
              {{ element.title }}
            </div>
            <b-modal id="my-modal" title="element.title"
              >Hello From My Modal!</b-modal
            >
          </draggable>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrInProgress"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrDone"
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
      newTask: [
        {
          title: '',
          content: ''
        }
      ],
      arrBacklog: [
        { title: '하루종일 숨쉬기', content: '' },
        { title: '침대에서 뒹굴거리기', content: '' },
        { title: '밥 잘먹기', content: '' }
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
        this.arrBacklog.push({ title: this.newTask.title, content: '' })
        this.newTask = ''
      }
    }
  }
}
</script>

<style scoped>
.kanban-column {
  min-height: 300px;
}
</style>
