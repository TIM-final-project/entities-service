import { AddressDto } from "src/common/dto/address.dto";

export class UpdateContractorDto {
  id: number;
  username?: string;
  name?: string;
  cuit: string;
  address?: AddressDto;
}
