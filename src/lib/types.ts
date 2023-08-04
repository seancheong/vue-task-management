interface IBaseTask {
  id: Id;
  order: string | number;
}

export type Id = string | number;
export type Task = IBaseTask & Record<string, any>;
