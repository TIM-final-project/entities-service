import { IntersectionType, PartialType } from '@nestjs/swagger';
import { UpdateData } from 'src/common/dto/update.dto';
import { CreateShittyManagerDto } from './create-shitty-manager.dto';

export class UpdateShittyManagerDto extends IntersectionType(
  PartialType(CreateShittyManagerDto),
  UpdateData,
) {}
