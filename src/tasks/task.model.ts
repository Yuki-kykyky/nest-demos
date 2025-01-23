export interface ITask {
  id: number;
  name: string;
  description: string;
  status: ETaskStatus;
}

export enum ETaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in progress",
  DONE = "done",
}
