import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskLabelDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}
