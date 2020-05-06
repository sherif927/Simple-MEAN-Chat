import Message from "./src/models/Message";

class MessageGenerator {
  generateMessage(senderName: string, payload: any): Message {
    return new Message(new Date(), senderName, payload);
  }
}

export default new MessageGenerator();