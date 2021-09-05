import { Controller, Get } from '@nestjs/common';
import { ManagerDto } from './dto/manager.dto';
import { ManagerService } from './manager.service';

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Get()
  async findAll(): Promise<ManagerDto[]> {
    return this.managerService.findAll();
  }
}
