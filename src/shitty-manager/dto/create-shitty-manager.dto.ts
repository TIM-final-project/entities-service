import { AddressDto } from "src/common/dto/address.dto";

export class CreateShittyManagerDto {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  cuit: string;
  birth_date?: Date;
  address?: AddressDto;
}
