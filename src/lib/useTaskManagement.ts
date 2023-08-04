import { computed, type Ref, ref } from 'vue';
import { type Id, type Task } from './types';

/**
 * Custom hook to manage the execution of tasks in a sequence
 *
 * @param initialTasks array of tasks to be executed, each task can be any type of object as long as it has an id and order property
 * @returns currentTask: the current task object in the sequence, isLastTask: boolean to indicate if the current task is the last task in the sequence, navigateToNextTask: function to navigate to the next task in the sequence
 */
export const useTaskManagement = (
  initialTasks: Task[] = [],
): {
  currentTask: Ref<Task | null>;
  isLastTask: Ref<boolean>;
  navigateToNextTask: () => void;
} => {
  // throw error if the passed in id or order is not string or number
  if (
    initialTasks.some(
      (task) =>
        (typeof task.id !== 'string' && typeof task.id !== 'number') ||
        (typeof task.order !== 'string' && typeof task.order !== 'number'),
    )
  ) {
    throw new Error(
      'The id and order of the task must be either string or number',
    );
  }

  const tasks = ref<Task[]>(initialTasks);
  const linkedList = ref<Record<Id, Task & { nextTaskId: Id | null }>>({});
  const currentTask = ref<Task | null>(null);

  // check if the current task is the last task in the sequence
  const isLastTask = computed(() => {
    return (
      currentTask.value !== null &&
      linkedList.value[currentTask.value.id]?.nextTaskId === null
    );
  });

  // initialize the task sequence as a linked list based on passed in initialTasks
  // the order of the tasks in the linked list is determined by the sequenceKey
  // this function is called once when the component is mounted
  const initializeTaskSequence = (): void => {
    const sortedTasks = [...tasks.value].sort((a, b) => {
      const aValue = Number(a.order);
      const bValue = Number(b.order);

      return aValue - bValue;
    });

    sortedTasks.forEach((task, index) => {
      const nextTaskId =
        index < sortedTasks.length - 1 ? sortedTasks[index + 1].id : null;

      linkedList.value[task.id] = {
        ...task,
        nextTaskId,
      };
    });

    currentTask.value = sortedTasks.length > 0 ? sortedTasks[0] : null;
  };

  // navigate to the next task in the sequence
  const navigateToNextTask = (): void => {
    if (
      currentTask.value !== null &&
      linkedList.value[currentTask.value.id]?.nextTaskId !== null
    ) {
      const nextTask = linkedList.value[currentTask.value.id]?.nextTaskId;

      if (nextTask !== null) {
        currentTask.value = linkedList.value[nextTask];
      }
    }
  };

  initializeTaskSequence();

  return {
    currentTask,
    isLastTask,
    navigateToNextTask,
  };
};
