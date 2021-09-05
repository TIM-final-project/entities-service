import { ContractorDto } from "src/contractors/dto/contractor.dto";

export class DriverDto {
  id?: number;
  name: string;
  surname: string;
  cuit: string;
  birth_date?: Date;
  contractor?: ContractorDto;
}