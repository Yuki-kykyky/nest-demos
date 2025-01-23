import { ETaskStatus } from "./task.model";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(ETaskStatus)
  status: ETaskStatus;
}
