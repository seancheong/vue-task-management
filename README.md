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

Then, in your Vue component call `useTaskManagement` with an array of tasks. Each task should be an object that has at least an `id` and an `order` property. The `id` can be a string or a number, and it uniquely identifies each task. The `order` property, which can also be a string or a number, determines the sequence in which the tasks should be executed.

```javascript
export default {
  setup() {
    const tasks = [
      { id: '1', order: '1', name: 'Task 1' },
      { id: '2', order: '2', name: 'Task 2' },
      // ... other tasks
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
```

## API

### `useTaskManagement(initialTasks: Task[]): { currentTask, isLastTask, navigateToNextTask }`

Parameters:

- `initialTasks`: An array of tasks to be executed. Each task can be any type of object as long as it has an `id` and `order` property.

Returns:

- `currentTask`: The current task in the sequence.
- `isLastTask`: A boolean indicating if the current task is the last in the sequence.
- `navigateToNextTask`: A function to navigate to the next task in the sequence.

Errors:

If any task in the `initialTasks` array does not have an `id` or `order` property of type string or number, the hook will throw an error.
