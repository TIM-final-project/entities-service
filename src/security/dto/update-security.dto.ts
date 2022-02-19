import { AddressDto } from "src/common/dto/address.dto";
import { OmitType } from '@nestjs/swagger';

export class UpdateSecurityDto{
  id: number;
  username: string;
  name?: string;
  surname?: string;
  cuit?: string;
  birth_date?: Date;
  address?: AddressDto;
}
