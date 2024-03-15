import { PartialType } from '@nestjs/swagger';
import { CreateAtencioneDto } from './create-atencione.dto';

export class UpdateAtencioneDto extends PartialType(CreateAtencioneDto) {}
