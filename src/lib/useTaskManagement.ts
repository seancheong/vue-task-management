import { type Ref, ref, computed } from 'vue';

/**
 * Custom hook to manage the execution of tasks in a sequence
 *
 * @param initialTasks array of tasks to be executed
 * @param id unique identifier of each task
 * @param sequenceKey key to determine the order of the tasks
 * @returns currentTask: the current task in the sequence, isLastTask: boolean to indicate if the current task is the last task in the sequence, navigateToNextTask: function to navigate to the next task in the sequence
 */
export const useTaskManagement = <T>(
  initialTasks: T[] = [],
  id: keyof T & (string | number),
  sequenceKey: keyof T,
): {
  currentTask: Ref<string | null>;
  isLastTask: Ref<boolean>;
  navigateToNextTask: () => void;
} => {
  // check if the id property of the first item is neither a string nor a number
  if (
    initialTasks.length > 0 &&
    typeof initialTasks[0][id] !== 'string' &&
    typeof initialTasks[0][id] !== 'number'
  ) {
    throw new Error('The id property must be of type string or number.');
  }

  const tasks = ref<T[]>(initialTasks);
  const linkedList = ref<Record<string, T & { nextTask: string | null }>>({});
  const currentTask = ref<string | null>(null);

  // check if the current task is the last task in the sequence
  const isLastTask = computed(() => {
    return (
      currentTask.value !== null &&
      linkedList.value[currentTask.value]?.nextTask === null
    );
  });

  // initialize the task sequence as a linked list based on passed in initialTasks
  // the order of the tasks in the linked list is determined by the sequenceKey
  // this function is called once when the component is mounted
  const initializeTaskSequence = (): void => {
    const sortedTasks = [...tasks.value].sort((a, b) => {
      const aValue = a[sequenceKey];
      const bValue = b[sequenceKey];

      // sort by accending order if values of sequenceKey are numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      // no sorting if values of sequenceKey are not numbers
      return 0;
    });

    sortedTasks.forEach((task, index) => {
      const nextTask =
        index < sortedTasks.length - 1 ? sortedTasks[index + 1][id] : null;

      const newTask: T & { nextTask: string | null } = {
        ...(task as T),
        nextTask: nextTask as string | null,
      };
      linkedList.value[String(task[id])] = newTask;
    });

    currentTask.value = sortedTasks[0][id] as string;
  };

  // navigate to the next task in the sequence
  const navigateToNextTask = (): void => {
    if (
      currentTask.value !== null &&
      linkedList.value[currentTask.value] !== undefined &&
      linkedList.value[currentTask.value].nextTask !== null
    ) {
      currentTask.value = linkedList.value[currentTask.value].nextTask;
    }
  };

  initializeTaskSequence();

  return {
    currentTask,
    isLastTask,
    navigateToNextTask,
  };
};