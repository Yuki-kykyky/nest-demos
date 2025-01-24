import { Injectable } from "@nestjs/common";
import { LoggerService } from "./logger/logger.service";
import { ConfigService } from "@nestjs/config";
import { ConfigType } from "./config/config.type";
import { AppConfig } from "./config/app.config";

@Injectable()
export class AppService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService<ConfigType>,
  ) {}

  getHello(): string {
    const prefix = this.configService.get<AppConfig>("app")?.messagePrefix;
    return `${prefix} Hello World! ${this.loggerService.log("Hello World!")}`;
  }
}
