import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueGateway } from './queue/queue.gateway';
import { DatabaseService } from './database/database.service';
import { AtencionesModule } from './atenciones/atenciones.module';
@Module({
  imports: [AtencionesModule],
  controllers: [AppController],
  providers: [AppService, QueueGateway, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
