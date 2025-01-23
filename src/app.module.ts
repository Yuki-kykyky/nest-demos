import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DummyService } from "./dummy/dummy.service";
import { LoggerService } from "./logger/logger.service";
import { MessageFormatter } from "./MessageFormatter";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DummyService, LoggerService, MessageFormatter],
})
export class AppModule {}
