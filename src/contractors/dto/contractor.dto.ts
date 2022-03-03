import { Type } from "class-transformer";
import { AddressDto } from "src/common/dto/address.dto";
import { DriverDto } from "src/driver/dto/driver.dto";
import { VehicleDto } from "src/vehicle/dto/vehicle.dto";
import { IntersectionType } from '@nestjs/swagger';
import { EntityDto } from "src/common/dto/entity.dto";


class ContractorData {
  @Type(type => AddressDto)
  address?: AddressDto;

  @Type(type => DriverDto)
  drivers?: DriverDto[];

  @Type(type => VehicleDto)
  vehicles?: VehicleDto[];
}


export class ContractorDto extends IntersectionType(
  EntityDto,
  ContractorData
){}