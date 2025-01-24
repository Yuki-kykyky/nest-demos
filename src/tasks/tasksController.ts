import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./create-task.dto";
import { FindOneParams } from "./find-one.params";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll().then((tasks) => tasks);
  }

  @Post()
  public create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get("/:id")
  public findOne(@Param() params: FindOneParams): Promise<Task | null> {
    return this.tasksService.findOne(params.id);
  }

  // @Patch("/:id/status")
  // public updateStatus(
  //   @Param() params: FindOneParams,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): Promise<Task> {
  //   const task = this.findOneOrFail(params.id);
  //   try {
  //     return this.tasksService.updateStatus(task, updateTaskDto);
  //   } catch (e) {
  //     if (e instanceof WrongTaskStatusException) {
  //       throw new WrongTaskStatusException();
  //     }
  //     throw e;
  //   }
  // }
}
