import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DummyService } from "./dummy/dummy.service";
import { LoggerService } from "./logger/logger.service";
import { MessageFormatter } from "./MessageFormatter";
import { TasksModule } from "./tasks/tasksModule";
import { TasksService } from "./tasks/tasks.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { appConfig } from "./config/app.config";
import { appConfigSchema } from "./config/config.type";
import { typeOrmConfig } from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypedConfigService } from "./config/typed-config.service";
import { Task } from "./tasks/task.entity";
import { User } from "./users/user.entity";
import { TaskLabel } from "./tasks/task-label.entity";
import { authConfig } from "./config/auth.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskLabel, User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get("database"),
        entities: [Task, User, TaskLabel],
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig, typeOrmConfig, authConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    // TypeOrmModule.forRoot(typeOrmConfig()),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DummyService,
    LoggerService,
    MessageFormatter,
    TasksService,
    {
      provide: TypedConfigService,
      useClass: TypedConfigService,
    },
  ],
})
export class AppModule {}
