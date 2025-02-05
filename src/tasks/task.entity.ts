import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ETaskStatus } from "./task.model";
import { User } from "../users/user.entity";
import { TaskLabel } from "./task-label.entity";

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

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;

  @OneToMany(() => TaskLabel, (taskLabel) => taskLabel.task, {
    cascade: true,
  })
  labels: TaskLabel[];
}
