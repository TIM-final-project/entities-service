import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private driverService: DriverService) {}

  // @Get()
  @MessagePattern('drivers_find_all')
  async findAll(): Promise<DriverDto[]> {
    return this.driverService.findAll();
  }

  // @Get(':id')
  @MessagePattern('drivers_find_by_id')
  async findOne(@Body('id') id: number): Promise<DriverDto> {
    return this.driverService.findOne(id);
  }

  // @Post()
  @MessagePattern('driver_create')
  async create(@Body() driverDto: CreateDriverDto): Promise<DriverDto> {
    const { contractorId } = driverDto;
    delete driverDto.contractorId;
    return this.driverService.create(contractorId, driverDto);
  }

  // @Put(':id')
  @MessagePattern('drivers_update')
  async update(@Body() driver: UpdateDriverDto) {
    console.log('Update driver request ', { driver });
    const { id } = driver;
    delete driver.id;
    return this.driverService.update(id, driver);
  }
}
