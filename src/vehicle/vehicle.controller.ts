import { Controller, Get } from '@nestjs/common';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get()
  async findAll(): Promise<VehicleDto[]> {
    return this.vehicleService.findAll();
  }
}
