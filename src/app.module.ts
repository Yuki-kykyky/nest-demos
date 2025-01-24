import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DummyService } from "./dummy/dummy.service";
import { LoggerService } from "./logger/logger.service";
import { MessageFormatter } from "./MessageFormatter";
import { TasksModule } from "./tasks/tasksModule";
import { TasksService } from "./tasks/tasks.service";
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./config/app.config";
import { appConfigSchema } from "./config/config.type";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    TasksModule,
  ],
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
