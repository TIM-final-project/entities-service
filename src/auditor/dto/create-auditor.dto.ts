import { AddressDto } from "src/common/dto/address.dto";

export class CreateAuditorDto {
  name: string;
  surname: string;
  username: string;
  email: string;
  phone?: string;
  cuit: string;
  birth_date?: Date;
  address?: AddressDto;
}
