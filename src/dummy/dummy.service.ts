import { Injectable } from "@nestjs/common";

@Injectable()
export class DummyService {
  public getDummy(): string {
    return "Dummy!";
  }
}
