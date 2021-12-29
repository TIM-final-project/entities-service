import { Body, Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { VehiclesQPs } from './dto/vehicle.qps';
import { VehicleService } from './vehicle.service';

interface header {
  id: number;
  vehicleQPs: VehiclesQPs;
}

@Controller('vehicles')
export class VehicleController {
  private readonly logger = new Logger(VehicleController.name);

  constructor(private vehicleService: VehicleService) {}

  // @Get()
  @MessagePattern('vehicles_find_all')
  findAll(vehicleQPs: VehiclesQPs): Promise<VehicleDto[]> {
    this.logger.debug('Getting vehicles', { vehicleQPs });
    return this.vehicleService.findAll(vehicleQPs);
  }

  // @Get(':id')
  @MessagePattern('vehicles_find_by_id')
  findOne({ id, vehicleQPs }: header): Promise<VehicleDto> {
    console.log(vehicleQPs);
    this.logger.debug('Getting vehicle by id', { id, vehicleQPs });
    return this.vehicleService.findOne(id, vehicleQPs);
  }

  // @Post()
  @MessagePattern('vehicles_create')
  create(@Body() vehicle: CreateVehicleDto): Promise<VehicleDto> {
    this.logger.debug('Creating Contractor', { vehicle });
    const { contractorId } = vehicle;
    delete vehicle.contractorId;
    return this.vehicleService.create(contractorId, vehicle);
  }

  // @Put(':id')
  @MessagePattern('vehicles_update')
  update(@Body() vehicle: UpdateVehicleDto): Promise<VehicleDto> {
    this.logger.debug('Update vehicle request ', { vehicle });
    const { id } = vehicle;
    delete vehicle.id;
    return this.vehicleService.update(id, vehicle);
  }
}
