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
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypedConfigService } from "./config/typed-config.service";
import { Task } from "./tasks/task.entity";
import { User } from "./users/user.entity";
import { TaskLabel } from "./tasks/task-label.entity";
import { AuthConfig, authConfig } from "./config/auth.config";
import { PasswordService } from "./users/password/password.service";
import { UserService } from "./users/user.service";
import { AuthController } from "./users/auth.controller";
import { AuthService } from "./users/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./users/auth/auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskLabel, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypedConfigService) => {
        const authConfig = config.get<AuthConfig>("auth");
        console.log("authConfig", authConfig);
        return {
          secret: authConfig?.jwt.secret,
          signOptions: {
            expiresIn: authConfig?.jwt.expiresIn,
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>("database"),
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
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    DummyService,
    LoggerService,
    MessageFormatter,
    TasksService,
    TypedConfigService,
    PasswordService,
    UserService,
    AuthService,
    AuthGuard,
  ],
})
export class AppModule {}
