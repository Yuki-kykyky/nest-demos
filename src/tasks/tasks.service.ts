import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskLabel } from "./task-label.entity";
import { CreateTaskLabelDto } from "./create-task-label.dto";
import { UpdateTaskDto } from "./update-task.dto";
import { ETaskStatus, ITask } from "./task.model";
import { WrongTaskStatusException } from "./exception/wrongTaskStatus.exception";
import { FilterTaskParams } from "./filter-task.params";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskLabel)
    private labelRepository: Repository<TaskLabel>,
  ) {}

  public async findAll(filter: FilterTaskParams): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        status: filter.status,
      },
      relations: ["labels"],
    });
  }

  public async findOne(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ["labels"],
    });
  }

  public async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(createTaskDto);
  }

  public async addLabelToTask(
    task: Task,
    labelDtos: CreateTaskLabelDto[],
  ): Promise<Task> {
    const labels = labelDtos.map((labelDto) =>
      this.labelRepository.create(labelDto),
    );
    task.labels = [...task.labels, ...labels];
    return await this.taskRepository.save(task);
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
