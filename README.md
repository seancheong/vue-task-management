# Vue Task Management

A Vue 3 Composition API library designed for task management processes.

This library was created with the intention of simplifying task management processes within Vue applications.

#### Key Features:

- Flexibility: Designed to handle various task structures and sequences.
- TypeScript Support: Built using TypeScript, this library is fully typed and can be easily integrated into TypeScript projects.
- Integration: Seamlessly integrates with Vue 3's Composition API.

## Table of Contents

- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

## Examples

[sources](./src/examples)

## Installation

```sh
# npm
npm install vue-task-management

# yarn
yarn add vue-task-management
```

## Usage

First, import the library:

```javascript
import { useTaskManagement } from 'vue-task-management';
```

Then, use it in your Vue component:

```javascript
export default {
  setup() {
    const { currentTask, isLastTask, navigateToNextTask } = useTaskManagement(
      tasks,
      'id',
      'executionSequence',
    );
    return {
      currentTask,
      isLastTask,
      navigateToNextTask,
    };
  },
};
```

## API

### `useTaskManagement(initialTasks, id, sequenceKey)`

- `initialTasks`: An array of tasks to be executed, it can be any object types.
- `id`: The unique identifier for each task (either string or number).
- `sequenceKey`: The key used to determine the sequence of tasks.

Returns:

- `currentTask`: The current task in the sequence.
- `isLastTask`: A boolean indicating if the current task is the last in the sequence.
- `navigateToNextTask`: A function to navigate to the next task in the sequence.
