import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get()
  async findAll(): Promise<VehicleDto[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<VehicleDto> {
    return this.vehicleService.findOne(id);
  }

  @Post()
  async create(@Body() vehicle: CreateVehicleDto): Promise<VehicleDto> {
    const { contractorId } = vehicle;
    delete vehicle.contractorId;
    return this.vehicleService.create(contractorId, vehicle);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() vehicle: UpdateVehicleDto): Promise<VehicleDto> {
    return this.vehicleService.update(id, vehicle);
  }
}
