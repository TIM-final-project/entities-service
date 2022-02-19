import { AddressDto } from "src/common/dto/address.dto";

export class CreateContractorDto {
  username: string;
  name: string;
  cuit: string;
  address: AddressDto;
}