import { ETaskStatus } from "./task.model";
import { IsEnum } from "class-validator";

export class UpdateTaskDto {
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
