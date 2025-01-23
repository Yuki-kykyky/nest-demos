import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DummyService } from "./dummy/dummy.service";
import { LoggerService } from "./logger/logger.service";
import { MessageFormatter } from "./MessageFormatter";
import { TasksModule } from "./tasks/tasksModule";
import { TasksService } from "./tasks/tasks.service";

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [
    AppService,
    DummyService,
    LoggerService,
    MessageFormatter,
    TasksService,
  ],
})
export class AppModule {}
