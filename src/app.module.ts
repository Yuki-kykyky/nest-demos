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
import { typeOrmConfig } from "./config/database.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService<ConfigType>) => ({
    //     ...configService.get("database"),
    //   }),
    // }),
    ConfigModule.forRoot({
      load: [appConfig, typeOrmConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        // allowUnknown: false,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig()),
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
