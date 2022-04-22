import { ContractorDto } from "src/contractors/dto/contractor.dto";
import { VehicleTypeDto } from "src/vehicle-type/vehicle-type.dto";

export class VehicleDto {
  id?: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  contractor?: ContractorDto;
  type?: VehicleTypeDto;
}