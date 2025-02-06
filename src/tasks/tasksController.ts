import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./create-task.dto";
import { FindOneParams } from "./find-one.params";
import { Task } from "./task.entity";
import { CreateTaskLabelDto } from "./create-task-label.dto";
import { UpdateTaskDto } from "./update-task.dto";
import { WrongTaskStatusException } from "./exception/wrongTaskStatus.exception";
import { FilterTaskParams } from "./filter-task.params";
import { PaginationParams } from "../common/pagination.params";
import { PaginationResponse } from "../common/pagination.response";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public async findAll(
    @Query() filters: FilterTaskParams,
    @Query() pagination: PaginationParams,
  ): Promise<PaginationResponse<Task>> {
    const [items, total] = await this.tasksService.findAll(filters, pagination);
    return {
      data: items,
      meta: {
        total,
        ...pagination,
      },
    };
  }

  @Post()
  public create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get("/:id")
  public findOne(@Param() params: FindOneParams): Promise<Task | null> {
    return this.tasksService.findOne(params.id);
  }

  @Post("/:id/labels")
  public async addLabelToTask(
    @Param() { id }: FindOneParams,
    @Body() createTaskLabelDto: CreateTaskLabelDto[],
  ): Promise<Task> {
    const task = await this.findOneOrFail(id);
    return this.tasksService.addLabelToTask(task, createTaskLabelDto);
  }

  @Patch("/:id/status")
  public async updateStatus(
    @Param() params: FindOneParams,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneOrFail(params.id);
    try {
      return this.tasksService.updateStatus(task, updateTaskDto);
    } catch (e) {
      if (e instanceof WrongTaskStatusException) {
        throw new WrongTaskStatusException();
      }
      throw e;
    }
  }

  private async findOneOrFail(id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }
}
