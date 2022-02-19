import { AddressDto } from "src/common/dto/address.dto";

export class CreateSecurityDto {
  username: string;
  name: string;
  surname: string;
  cuit: string;
  birth_date?: Date;
  address?: AddressDto;
}
