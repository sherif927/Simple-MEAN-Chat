import User from "./models/User";

class UserRepository {
  private users: User[] = [];

  getUserById(id): User {
    let index = this.users.findIndex((user) => user.id == id);
    return this.users[index];
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  removeUser(userId: string): User {
    const user = this.getUserById(userId);
    if (user) {
      this.users = this.users.filter(user => user.id != userId);
    }
    return user;
  }

  checkRoomForUser(username: string, roomName: string): boolean {
    const usersInRoom = this.users.filter(user => user.room == roomName);
    const user = usersInRoom.find(user => user.username == username);
    return !user;
  }

}

export default UserRepository;