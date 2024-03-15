import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtencionesService } from './atenciones.service';
import { CreateAtencioneDto } from './dto/create-atencione.dto';
import { UpdateAtencioneDto } from './dto/update-atencione.dto';
import { DatabaseService } from 'src/database/database.service';

@Controller('atenciones')
export class AtencionesController {
  constructor(
    private readonly atencionesService: AtencionesService,
    private readonly databaseService: DatabaseService, // Add DatabaseService here
  ) {}
  @Post()
  create(@Body() createAtencioneDto: CreateAtencioneDto) {
    return this.atencionesService.create(createAtencioneDto);
  }

  // @Get()
  // findAll() {
  //   return this.atencionesService.findAll();
  // }

  @Get()
  async fetchData() {
    const data = await this.databaseService.fetchAtendimentos();
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atencionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAtencioneDto: UpdateAtencioneDto,
  ) {
    return this.atencionesService.update(+id, updateAtencioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atencionesService.remove(+id);
  }
}
