import { Address } from "src/common/dto/address.dto";

export class UpdateContractorDto {
  id: number;
  name?: string;
  cuit: string;
  address?: Address;
}
