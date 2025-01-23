export interface ITask {
  id: string;
  title: string;
  description: string;
  status: ETaskStatus;
}

export enum ETaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in progress",
  DONE = "done",
}
