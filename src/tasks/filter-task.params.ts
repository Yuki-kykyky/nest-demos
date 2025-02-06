import { IsEnum, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { ETaskStatus } from "./task.model";

export class FilterTaskParams {
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;

  @IsOptional()
  @MinLength(3)
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(["title", "status"])
  sortBy?: string = "title";

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  sortOrder?: "ASC" | "DESC" = "DESC";
}
