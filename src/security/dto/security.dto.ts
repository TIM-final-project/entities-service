import { AddressDto } from "src/common/dto/address.dto";
import { EntityDto } from "src/common/dto/entity.dto";
import { IntersectionType } from '@nestjs/swagger';

class SecurityData {
  surname: string;
  birth_date?: Date;
  address?: AddressDto;
}

export class SecurityDto extends IntersectionType(
    EntityDto,
    SecurityData
){}