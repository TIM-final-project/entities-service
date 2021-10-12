import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { DriversQPs } from './dto/driver.qps';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriverController {
  private readonly logger = new Logger(DriverController.name);

  constructor(private driverService: DriverService) {}

  // @Get()
  @MessagePattern('drivers_find_all')
  async findAll(driverQPs: DriversQPs): Promise<DriverDto[]> {
    this.logger.debug('Getting drivers', { driverQPs });
    return this.driverService.findAll(driverQPs);
  }

  // @Get(':id')
  @MessagePattern('drivers_find_by_id')
  async findOne(@Body('id') id: number): Promise<DriverDto> {
    this.logger.debug(`Getting driver id: ${id}`);
    return await this.driverService.findOne(id);
  }

  // @Post()
  @MessagePattern('drivers_create')
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
