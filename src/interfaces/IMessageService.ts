export interface IMessageServices {
  customMessageLenght(message: string): Promise<string[]>;
  saveMessages(messages: string[], campaignId: number): any;
}
