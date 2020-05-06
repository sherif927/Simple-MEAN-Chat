import express from 'express';
import cors from 'cors';
import * as http from 'http';
import UserRepository from './UserRepository';
import User from './models/User';
import generator from '../MessageGenerator';

export class ChatApp {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private server: http.Server;
  private io: SocketIO.Server;
  private port: string | number;
  private repo: UserRepository;

  constructor() {
    this.createApp();
    this.createServer();
    this.config();
    this.sockets();
    this.listen();
  }


  private createApp(): void {
    this.app = express();
    this.app.use(cors());
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatApp.PORT;
  }

  private sockets(): void {
    this.io = require("socket.io")(this.server);
  }

  private listen(): void {
    this.repo = new UserRepository();
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });

    this.io.on('connection', (socket: any) => {
      console.log("A new user has connected");

      socket.on('join', (params: any) => {
        console.log(`${params.username} has entered join`);
        this.repo.removeUser(socket.id);
        this.repo.addUser(new User(socket.id, params.username, params.roomName));
        socket.join(params.roomName);
        console.log(`${params.username} joined ${params.roomName}`);
        socket.emit('message', generator.generateMessage('Admin', { text: `Welcome to ${params.roomName}` }));
        this.io
          .to(params.roomName)
          .emit('message', generator.generateMessage('Admin', { text: `${params.username} has joined the chat!` }));
      })

      socket.on("createMessage", (m: string) => {
        let user: User = this.repo.getUserById(socket.id);
        this.io
          .to(user.room)
          .emit('message', generator.generateMessage(user.username, { text: m }))
      });

      socket.on('disconnect', () => {
        let user: User = this.repo.removeUser(socket.id);
        console.log(`${user.username} has logged out`);
        if (user) {
          this.io
            .to(user.room)
            .emit('message', generator.generateMessage('Admin', { text: `User ${user.username} has left the room!` }))
        }
      });
    });
  }

  public static bootstrapApplication() {
    return new ChatApp();
  }

}

