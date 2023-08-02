import { useTaskManagement } from './useTaskManagement';

describe('useTaskManagement', () => {
  it('should initialize the task sequence as a linked list based on passed in initialTasks', () => {
    // given
    const tasks = [
      { name: 'Task 1', executionSequence: 2 },
      { name: 'Task 2', executionSequence: 1 },
      { name: 'Task 3', executionSequence: 3 },
    ];

    // when
    const { currentTask } = useTaskManagement(
      tasks,
      'name',
      'executionSequence',
    );

    // then
    expect(currentTask.value).toBe('Task 2');
  });

  it('should navigate to the next task in the sequence', () => {
    // given
    const tasks = [
      { name: 'Task 1', executionSequence: 2 },
      { name: 'Task 2', executionSequence: 1 },
      { name: 'Task 3', executionSequence: 3 },
    ];

    // when
    const { currentTask, navigateToNextTask } = useTaskManagement(
      tasks,
      'name',
      'executionSequence',
    );

    // then
    expect(currentTask.value).toBe('Task 2');

    navigateToNextTask();
    expect(currentTask.value).toBe('Task 1');

    navigateToNextTask();
    expect(currentTask.value).toBe('Task 3');
  });

  it('should return true if the current task is the last task in the sequence', () => {
    // given
    const tasks = [
      { name: 'Task 1', executionSequence: 2 },
      { name: 'Task 2', executionSequence: 1 },
      { name: 'Task 3', executionSequence: 3 },
    ];

    // when
    const { isLastTask, navigateToNextTask } = useTaskManagement(
      tasks,
      'name',
      'executionSequence',
    );

    // then
    expect(isLastTask.value).toBe(false);

    navigateToNextTask();
    navigateToNextTask();
    expect(isLastTask.value).toBe(true);
  });

  it('should still show the current task as last task even if navigateToNextTask is called when the current task is already the last task', () => {
    // given
    const tasks = [
      { name: 'Task 1', executionSequence: 2 },
      { name: 'Task 2', executionSequence: 1 },
      { name: 'Task 3', executionSequence: 3 },
    ];

    // when
    const { isLastTask, navigateToNextTask } = useTaskManagement(
      tasks,
      'name',
      'executionSequence',
    );

    // then
    expect(isLastTask.value).toBe(false);

    navigateToNextTask();
    navigateToNextTask();
    navigateToNextTask();
    expect(isLastTask.value).toBe(true);

    navigateToNextTask();
    expect(isLastTask.value).toBe(true);
  });

  it('should not able to sort the tasks if sequence key is not number', () => {
    // given
    const tasks = [
      { name: 'Task 1', order: '2' },
      { name: 'Task 2', order: '1' },
      { name: 'Task 3', order: '3' },
    ];

    // when
    const { currentTask } = useTaskManagement(tasks, 'name', 'order');

    // then
    expect(currentTask.value).toBe('Task 1');
  });

  it('should be able to accept id as number', () => {
    // given
    const tasks = [
      { id: 1, executionSequence: 2 },
      { id: 2, executionSequence: 1 },
      { id: 3, executionSequence: 3 },
    ];

    // when
    const { currentTask, navigateToNextTask } = useTaskManagement(
      tasks,
      'id',
      'executionSequence',
    );

    // then
    expect(currentTask.value).toBe(2);

    navigateToNextTask();
    expect(currentTask.value).toBe(1);

    navigateToNextTask();
    expect(currentTask.value).toBe(3);
  });

  it('should throw error if the passed in id is neither string nor number', () => {
    // given
    const tasks = [
      { id: true, executionSequence: 2 },
      { id: false, executionSequence: 1 },
      { id: null, executionSequence: 3 },
    ];

    // then
    expect(() => {
      useTaskManagement(tasks, 'id', 'executionSequence');
    }).toThrowError();
  });
});
