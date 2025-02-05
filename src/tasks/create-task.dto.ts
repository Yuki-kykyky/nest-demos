import { ETaskStatus } from "./task.model";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  // @IsEnum(ETaskStatus)
  status: ETaskStatus;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
