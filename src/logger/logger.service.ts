import { Injectable } from "@nestjs/common";
import { MessageFormatter } from "../MessageFormatter";

@Injectable()
export class LoggerService {
  constructor(private readonly messageFormatter: MessageFormatter) {}

  log(message: string) {
    return this.messageFormatter.format(message);
  }
}
