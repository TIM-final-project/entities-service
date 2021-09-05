import { Controller, Get } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverDto } from './dto/driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Get()
  async findAll(): Promise<DriverDto[]> {
    return this.driverService.findAll();
  }
}
