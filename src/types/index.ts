export interface ITask {
  id: number;
  title: string;
  date: Date;
  tag: Tag | null;
  listId: number;
  sortIdx: number;
}

export interface ITaskList {
  id: number;
  title: string;
  tasks: ITask[];
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}
