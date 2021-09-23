import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  // @Get()
  @MessagePattern('vehicles_find_all')
  async findAll(): Promise<VehicleDto[]> {
    return this.vehicleService.findAll();
  }

  // @Get(':id')
  @MessagePattern('vehicles_find_by_id')
  async findOne(@Body('id') id: number): Promise<VehicleDto> {
    return this.vehicleService.findOne(id);
  }

  // @Post()
  @MessagePattern('vehicles_create')
  async create(@Body() vehicle: CreateVehicleDto): Promise<VehicleDto> {
    const { contractorId } = vehicle;
    delete vehicle.contractorId;
    return this.vehicleService.create(contractorId, vehicle);
  }

  // @Put(':id')
  @MessagePattern('vehicles_update')
  async update(@Body() vehicle: UpdateVehicleDto): Promise<VehicleDto> {
    console.log('Update Vehicle ', { vehicle });
    const { id } = vehicle;
    delete vehicle.id;
    return this.vehicleService.update(id, vehicle);
  }
}
