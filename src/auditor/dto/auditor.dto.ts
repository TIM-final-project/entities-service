import { AddressDto } from "src/common/dto/address.dto";
import { IntersectionType } from '@nestjs/swagger';
import { EntityDto } from "src/common/dto/entity.dto";

class AuditorData {
  surname: string;
  birth_date: Date;
  address: AddressDto;
}


export class AuditorDto extends IntersectionType(
  EntityDto,
  AuditorData
){}