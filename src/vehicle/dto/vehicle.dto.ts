import { ContractorDto } from "src/contractors/dto/contractor.dto";

export class VehicleDto {
  id?: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  contractor?: ContractorDto;
}