import { type Ref, ref, computed } from 'vue';
import { type TaskList, type ITask } from './models';

export const useTaskManagement = (
  initialTasks: ITask[] = [],
  sequenceKey: keyof ITask = 'executionSequence',
): {
  currentTask: Ref<string | null>;
  isLastTask: Ref<boolean>;
  navigateToNextTask: () => void;
} => {
  const tasks: Ref<ITask[]> = ref(initialTasks);
  const linkedList: Ref<TaskList> = ref({});
  const currentTask: Ref<string | null> = ref(null);

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
    const list: TaskList = {};

    sortedTasks.forEach((task, index) => {
      const nextTask =
        index < sortedTasks.length - 1 ? sortedTasks[index + 1].name : null;
      list[task.name] = { ...task, nextTask };
    });

    linkedList.value = list;
    currentTask.value = sortedTasks[0]?.name ?? null;
  };

  // navigate to the next task in the sequence
  const navigateToNextTask = (): void => {
    if (
      currentTask.value !== null &&
      linkedList.value[currentTask.value] !== null
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
