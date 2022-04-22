import { VehicleTypeDto } from "src/vehicle-type/vehicle-type.dto";

export class CreateVehicleDto {
  plate: string;
  brand: string;
  model: string;
  year: number;
  contractorId: number;
  type?: VehicleTypeDto;
}
