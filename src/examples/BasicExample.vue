<script lang="ts">
import { useTaskManagement } from '../lib';

export default {
  name: 'BasicExample',

  setup() {
    // sample tasks for demonstration
    const tasks = [
      { name: 'Task 1', executionSequence: 1 },
      { name: 'Task 2', executionSequence: 2 },
      { name: 'Task 3', executionSequence: 3 },
      { name: 'Task 4', executionSequence: 4 },
      { name: 'Task 5', executionSequence: 5 },
      { name: 'Task 6', executionSequence: 6 },
      { name: 'Task 7', executionSequence: 7 },
      { name: 'Task 8', executionSequence: 8 },
      { name: 'Task 9', executionSequence: 9 },
      { name: 'Task 10', executionSequence: 10 },
    ];

    const { currentTask, isLastTask, navigateToNextTask } = useTaskManagement(
      tasks,
      'name',
      'executionSequence',
    );

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
    <p>Current Task: {{ currentTask }}</p>
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
