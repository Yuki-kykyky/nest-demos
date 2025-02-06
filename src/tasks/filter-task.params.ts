import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ETaskStatus } from "./task.model";

export class FilterTaskParams {
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;

  @IsOptional()
  @MinLength(3)
  @IsString()
  search?: string;
}
