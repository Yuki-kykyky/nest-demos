import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ITask } from "./task.model";
import { CreateTaskDto } from "./create-task.dto";
import { FindOneParams } from "./find-one.params";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public findAll(): ITask[] {
    return this.tasksService.findAll();
  }

  @Post()
  public create(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.create(createTaskDto);
  }

  @Get("/:id")
  public findOne(@Param() params: FindOneParams): ITask | undefined {
    return this.tasksService.findOne(params.id);
  }
}
