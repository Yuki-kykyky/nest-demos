import { Module } from "@nestjs/common";
import { TasksController } from "./tasksController";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { User } from "../users/user.entity";
import { TaskLabel } from "./task-label.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, TaskLabel])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
