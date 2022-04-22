import { AddressDto } from "src/common/dto/address.dto";
import { IntersectionType } from '@nestjs/swagger';
import { EntityDto } from "src/common/dto/entity.dto";
import { Type } from "class-transformer";

class ExpeditorData {
  surname: string;

  birth_date?: Date;

  @Type(type => AddressDto)
  address?: AddressDto;
}

export class ExpeditorDTO extends IntersectionType(
  EntityDto,
  ExpeditorData
){}