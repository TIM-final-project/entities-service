import { AddressDto } from "src/common/dto/address.dto";

export class UpdateDriverDto {
  id: number;
  name?: string;
  surname?: string;
  cuit?: string;
  birth_date?: Date;
  address?: AddressDto;
}
