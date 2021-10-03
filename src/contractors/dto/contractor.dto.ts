import { Address } from "src/common/interfaces/address.interface";
import { DriverDto } from "src/driver/dto/driver.dto";
import { VehicleDto } from "src/vehicle/dto/vehicle.dto";

export class ContractorDto {
  id?: number;
  name: string;
  cuit: string;
  // street_address?: string;
  // number_address?: number;
  // city_address?: string;
  // province_address?: string;
  address: Address;
  drivers?: DriverDto[];
  vehicles?: VehicleDto[];
}