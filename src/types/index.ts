export interface ITask {
  id: number;
  title: string;
  date: string;
  tag: Tag | null;
}

export interface ITaskList {
  title: string;
  tasks: ITask[];
}

export interface Tag {
  name: string;
  color: string;
}
