export default class User {
  constructor(id: string, username: string, room: string) {
    this.id = id;
    this.username = username;
    this.room = room;
  }

  id: string;
  username: string;
  room: string;
}