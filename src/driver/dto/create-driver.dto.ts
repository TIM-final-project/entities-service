import { Address } from "src/common/interfaces/address.interface";

export class CreateDriverDto {
  name: string;
  surname: string;
  cuit: string;
  birth_date?: Date;
  contractorId: number;
  address?: Address
}
