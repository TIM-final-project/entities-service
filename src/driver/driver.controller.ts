import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Get()
  async findAll(): Promise<DriverDto[]> {
    return this.driverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DriverDto> {
    return this.driverService.findOne(id);
  }

  @Post()
  async create(@Body() driverDto: CreateDriverDto): Promise<DriverDto> {
    const { contractorId } = driverDto;
    delete driverDto.contractorId;
    return this.driverService.create(contractorId, driverDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() driver: UpdateDriverDto) {
    return this.driverService.update(id, driver);
  }
}
