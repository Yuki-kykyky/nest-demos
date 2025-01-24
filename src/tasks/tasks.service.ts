import { Injectable } from "@nestjs/common";
import { ETaskStatus, ITask } from "./task.model";
import { CreateTaskDto } from "./create-task.dto";
import { UpdateTaskDto } from "./update-task.dto";
import { WrongTaskStatusException } from "./exception/wrongTaskStatus.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  public async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async findOne(id: string): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  public async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(createTaskDto);
  }

  public async updateStatus(
    task: ITask,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
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
    return await this.taskRepository.save(task);
  }

  /*
   * duplicate with createTaskDto annotation,
   * as a reminder that we can achieve the same validation by defining a method
   * */
  private isValidateStatus(status: string): boolean {
    return Object.values(ETaskStatus).includes(status as ETaskStatus);
  }
}
