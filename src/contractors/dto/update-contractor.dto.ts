import { Address } from "src/common/interfaces/address.interface";

export class UpdateContractorDto {
  id: number;
  name?: string;
  cuit: string;
  address?: Address;
  // street_address?: string;
  // number_address?: number;
  // city_address?: string;
  // province_address?: string;
}
