import { IntersectionType, PartialType } from '@nestjs/swagger';
import { UpdateData } from 'src/common/dto/update.dto';
import { CreateSecurityDto } from "./create-security.dto";

export class UpdateSecurityDto extends IntersectionType(
    PartialType(CreateSecurityDto),
    UpdateData,
  ) {}