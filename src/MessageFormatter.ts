export class MessageFormatter {
  format(message: string) {
    const currentTimeStamp = new Date().toISOString();
    return `[${currentTimeStamp}] ${message}`;
  }
}
