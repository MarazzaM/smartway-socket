import { Module } from '@nestjs/common';
import { AtencionesService } from './atenciones.service';
import { AtencionesController } from './atenciones.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AtencionesController],
  providers: [AtencionesService, DatabaseService],
})
export class AtencionesModule {}
