export enum MessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  information = 'information'
}
export class FunctionalMessage {
  constructor(
    public message: string,
    public type: MessageType,
    public fieldId: string
  ) {}
}
export class ListeFunctionalMessage {
  public listeFunctionalMessage: FunctionalMessage[] = new Array<FunctionalMessage>();

  public addMessage(message: FunctionalMessage): void {
    if (message && !this.isIncludedFunctionalMessage(message)) {
      this.listeFunctionalMessage.push(message);
    }
  }

  public addManyMessages(messages: FunctionalMessage[]): void {
    messages.forEach((message) => {
      this.addMessage(message);
    });
  }
  public clear(): void {
    this.listeFunctionalMessage = [];
  }

  public get length(): number {
    return this.listeFunctionalMessage.length;
  }

  private isIncludedFunctionalMessage(message: FunctionalMessage): boolean {
    return this.listeFunctionalMessage.some((p) => p.message === message.message);
  }
}
