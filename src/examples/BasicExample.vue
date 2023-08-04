<script lang="ts">
import { useTaskManagement } from '../lib';

export default {
  name: 'BasicExample',

  setup() {
    // sample tasks for demonstration
    const tasks = [
      { id: '1', order: 1, name: 'Task 1' },
      { id: '2', order: 2, name: 'Task 2' },
      { id: '3', order: 3, name: 'Task 3' },
      { id: '4', order: 4, name: 'Task 4' },
      { id: '5', order: 5, name: 'Task 5' },
      { id: '6', order: 6, name: 'Task 6' },
      { id: '7', order: 7, name: 'Task 7' },
      { id: '8', order: 8, name: 'Task 8' },
      { id: '9', order: 9, name: 'Task 9' },
      { id: '10', order: 10, name: 'Task 10' },
    ];

    const { currentTask, isLastTask, navigateToNextTask } =
      useTaskManagement(tasks);

    return {
      currentTask,
      isLastTask,
      navigateToNextTask,
    };
  },
};
</script>

<template>
  <div>
    <h2>Basic Example of useTaskManagement hook</h2>
    <p>Current Task: {{ currentTask?.name }}</p>
    <button @click="navigateToNextTask" :disabled="isLastTask">
      Next Task
    </button>

    <p :class="{ show: isLastTask }" class="info">
      This is the last task, you can't go further.
    </p>
  </div>
</template>

<style scoped>
button {
  margin-bottom: 24px;
}

.info {
  visibility: hidden;
  height: 1.5em;
}

.info.show {
  visibility: visible;
}
</style>
