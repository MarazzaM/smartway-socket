import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueGateway } from './queue/queue.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, QueueGateway],
})
export class AppModule {}
