export interface ITask {
  id: number;
  title: string;
  date: Date;
  notificationDate?: Date;
  notificationRead: boolean;
  tag: Tag | null;
  listId: number;
}

export interface ITaskList {
  id: number;
  title: string;
  order: number[];
  tasks: ITask[];
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}
