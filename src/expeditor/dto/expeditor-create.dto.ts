import { AddressDto } from "src/common/dto/address.dto";

export class CreateExpeditorDTO {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  cuit: string;
  birth_date?: Date;
  address?: AddressDto;
  plant: number;
}
