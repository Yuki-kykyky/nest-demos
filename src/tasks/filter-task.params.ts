import { IsEnum, IsOptional } from "class-validator";
import { ETaskStatus } from "./task.model";

export class FilterTaskParams {
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;
}
