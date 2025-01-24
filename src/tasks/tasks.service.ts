import { Injectable, NotFoundException } from "@nestjs/common";
import { ETaskStatus, ITask } from "./task.model";
import { CreateTaskDto } from "./create-task.dto";
import { randomUUID } from "crypto";
import { UpdateTaskDto } from "./update-task.dto";
import { WrongTaskStatusException } from "./exception/wrongTaskStatus.exception";

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  public findAll(): ITask[] {
    return this.tasks;
  }

  public findOne(id: string): ITask {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  public create(createTaskDto: CreateTaskDto): ITask {
    const task: ITask = {
      id: randomUUID(),
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }

  public updateStatus(task: ITask, updateTaskDto: UpdateTaskDto): ITask {
    if (updateTaskDto.status) {
      if (!this.isValidateStatus(updateTaskDto.status)) {
        throw new WrongTaskStatusException();
      }
      task.status = updateTaskDto.status;
    }
    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }
    return task;
  }

  /*
   * duplicate with createTaskDto annotation,
   * as a reminder that we can achieve the same validation by defining a method
   * */
  private isValidateStatus(status: string): boolean {
    return Object.values(ETaskStatus).includes(status as ETaskStatus);
  }
}
