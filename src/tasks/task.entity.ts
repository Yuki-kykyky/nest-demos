import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ETaskStatus } from "./task.model";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
    type: "varchar",
    nullable: false,
  })
  title: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "enum",
    enum: ETaskStatus,
    default: ETaskStatus.OPEN,
  })
  status: ETaskStatus;
}
