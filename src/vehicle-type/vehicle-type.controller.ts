import { Body, Controller, Get, Logger, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VehicleTypeDto } from './vehicle-type.dto';
import { VehicleTypeService } from './vehicle-type.service';

@Controller('vehicle-types')
export class VehicleTypeController {
  private readonly logger = new Logger(VehicleTypeController.name);

  constructor(private vehicleTypeService: VehicleTypeService) {}

  // @Get()
  @MessagePattern('vehicle_types_find_all')
  async allTypes(): Promise<VehicleTypeDto[]> {
    return this.vehicleTypeService.findAll();
  }
}
