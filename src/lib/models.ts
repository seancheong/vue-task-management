export interface ITask {
  name: string;
  executionSequence: number;
  description?: string;
}

interface ITaskNode extends ITask {
  nextTask: string | null;
}

export type TaskList = Record<string, ITaskNode>;
