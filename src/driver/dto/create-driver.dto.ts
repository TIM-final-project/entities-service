import { AddressDto } from "src/common/dto/address.dto";

export class CreateDriverDto {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  cuit: string;
  birth_date?: Date;
  contractorId: number;
  address?: AddressDto;
  active: boolean;
  is_valid?: boolean;
}
