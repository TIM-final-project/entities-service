import { Address } from "src/common/dto/address.dto";
import { DriverDto } from "src/driver/dto/driver.dto";
import { VehicleDto } from "src/vehicle/dto/vehicle.dto";

export class ContractorDto {
  id?: number;
  name: string;
  cuit: string;
  address: Address;
  drivers?: DriverDto[];
  vehicles?: VehicleDto[];
}