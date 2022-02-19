import { Body, Controller, Logger,} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DriversQPs } from './dto/driver.qps';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { plainToInstance } from 'class-transformer';

interface header {
  id: number,
  driverQPs: DriversQPs
}

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
  findOne({ id, driverQPs }: header): Promise<DriverDto> {
    this.logger.debug(`Getting driver id: ${id}`, driverQPs);
    return this.driverService.findOne(id, driverQPs);
  }

  // @Post()
  @MessagePattern('drivers_create')
  async create(@Body() driverDto: CreateDriverDto): Promise<DriverDto> {
    const { contractorId } = driverDto;
    delete driverDto.contractorId;
    return plainToInstance(DriverDto, await this.driverService.create(contractorId, driverDto));
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
