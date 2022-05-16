import { AddressDto } from "src/common/dto/address.dto";

export class CreateContractorDto {
  username: string;
  name: string;
  cuit: string;
  email: string;
  phone?: string;
  address: AddressDto;
  is_valid?: boolean;
}