import { ETaskStatus } from "./task.model";

export class CreateTaskDto {
  title: string;
  description: string;
  status: ETaskStatus;
}
