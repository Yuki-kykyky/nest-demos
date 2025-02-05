import { Task } from "./task.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity()
// avoid duplicate labels for the same task
@Unique(["name", "taskId"])
export class TaskLabel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  // faster queries
  @Index()
  @Column()
  taskId: string;

  @ManyToOne(() => Task, (task) => task.labels, {
    orphanedRowAction: "delete",
    onDelete: "CASCADE",
  })
  task: Task;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
