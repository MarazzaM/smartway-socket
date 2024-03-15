import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { DatabaseService } from 'src/database/database.service';

@WebSocketGateway({ cors: true })
export class QueueGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(QueueGateway.name);
  constructor(private readonly databaseService: DatabaseService) {} // Inject DatabaseService

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('ping')
  async handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    
    // Example usage of fetchSomeData from DatabaseService
    try {
      const fetchedData = await this.databaseService.fetchAtendimentos();
      return {
        event: "pong",
        data: fetchedData,
      };
    } catch (error) {
      this.logger.error('Error fetching data:', error);
      return {
        event: "error",
        message: "Failed to fetch data",
      };
    }
  }
}