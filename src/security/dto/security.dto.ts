import { Address } from "src/common/dto/address.dto";

export class SecurityDto {
  id?: number;
  name: string;
  surname: string;
  cuit: string;
  birth_date?: Date;
  address?: Address;
}
