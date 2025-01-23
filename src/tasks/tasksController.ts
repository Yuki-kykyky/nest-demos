import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ETaskStatus, ITask } from "./task.model";
import { CreateTaskDto } from "./create-task.dto";
import { FindOneParams } from "./find-one.params";
import { UpdateTaskDto } from "./update-task.dto";

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
    return this.findOneOrFail(params.id);
  }

  @Patch("/:id/status")
  public updateStatus(
    @Param() params: FindOneParams,
    @Body("status") body: UpdateTaskDto,
  ): ITask {
    const task = this.findOneOrFail(params.id);
    task.status = body.status;
    return task;
  }

  private findOneOrFail(id: string): ITask {
    return this.tasksService.findOne(id);
  }
}
