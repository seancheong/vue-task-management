import { useTaskManagement } from './useTaskManagement';

describe('useTaskManagement', () => {
  it('should initialize the task sequence as a linked list based on passed in initialTasks', () => {
    // given
    const tasks = [
      { id: 'Task 1', order: 2 },
      { id: 'Task 2', order: 1 },
      { id: 'Task 3', order: 3 },
    ];

    // when
    const { currentTask } = useTaskManagement(tasks);

    // then
    expect(currentTask.value?.id).toBe('Task 2');
  });

  it('should navigate to the next task in the sequence', () => {
    // given
    const tasks = [
      { id: 'Task 1', order: 2 },
      { id: 'Task 2', order: 1 },
      { id: 'Task 3', order: 3 },
    ];

    // when
    const { currentTask, navigateToNextTask } = useTaskManagement(tasks);

    // then
    expect(currentTask.value?.id).toBe('Task 2');

    navigateToNextTask();
    expect(currentTask.value?.id).toBe('Task 1');

    navigateToNextTask();
    expect(currentTask.value?.id).toBe('Task 3');
  });

  it('should return true if the current task is the last task in the sequence', () => {
    // given
    const tasks = [
      { id: 'Task 1', order: 2 },
      { id: 'Task 2', order: 1 },
      { id: 'Task 3', order: 3 },
    ];

    // when
    const { isLastTask, navigateToNextTask } = useTaskManagement(tasks);

    // then
    expect(isLastTask.value).toBe(false);

    navigateToNextTask();
    navigateToNextTask();
    expect(isLastTask.value).toBe(true);
  });

  it('should still show the current task as last task even if navigateToNextTask is called when the current task is already the last task', () => {
    // given
    const tasks = [
      { id: 'Task 1', order: 2 },
      { id: 'Task 2', order: 1 },
      { id: 'Task 3', order: 3 },
    ];

    // when
    const { isLastTask, navigateToNextTask } = useTaskManagement(tasks);

    // then
    expect(isLastTask.value).toBe(false);

    navigateToNextTask();
    navigateToNextTask();
    navigateToNextTask();
    expect(isLastTask.value).toBe(true);

    navigateToNextTask();
    expect(isLastTask.value).toBe(true);
  });

  it('should able to sort the tasks even if sequence key is not number', () => {
    // given
    const tasks = [
      { id: 'Task 1', order: '2' },
      { id: 'Task 2', order: '1' },
      { id: 'Task 3', order: '3' },
    ];

    // when
    const { currentTask } = useTaskManagement(tasks);

    // then
    expect(currentTask.value?.id).toBe('Task 2');
  });

  it('should be able to accept id as number', () => {
    // given
    const tasks = [
      { id: 1, order: 2 },
      { id: 2, order: 1 },
      { id: 3, order: 3 },
    ];

    // when
    const { currentTask, navigateToNextTask } = useTaskManagement(tasks);

    // then
    expect(currentTask.value?.id).toBe(2);

    navigateToNextTask();
    expect(currentTask.value?.id).toBe(1);

    navigateToNextTask();
    expect(currentTask.value?.id).toBe(3);
  });

  it('should throw error if the passed in id is neither string nor number', () => {
    // given
    const tasks = [
      { id: 1, order: 2 },
      { id: false, order: 1 },
      { id: null, order: 3 },
    ];

    // then
    expect(() => {
      // @ts-expect-error: test invalid input type
      useTaskManagement(tasks);
    }).toThrowError();
  });

  it('should throw error if the passed in order is neither string nor number', () => {
    // given
    const tasks = [
      { id: 1, order: 2 },
      { id: 2, order: 1 },
      { id: 3, order: null },
    ];

    // then
    expect(() => {
      // @ts-expect-error: test invalid input type
      useTaskManagement(tasks);
    }).toThrowError();
  });
});
