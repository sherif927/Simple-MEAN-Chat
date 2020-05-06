export default class Message {
  constructor(createdAt: Date, senderName: string, content: any) {
    this.createdAt = createdAt;
    this.senderName = senderName;
    this.content = content;
  }
  private createdAt: Date;
  private senderName: string;
  private content: any;
}