import { ETaskStatus } from "./task.model";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { CreateTaskLabelDto } from "./create-task-label.dto";
import { Type } from "class-transformer";

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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskLabelDto)
  labels?: CreateTaskLabelDto[];
}
