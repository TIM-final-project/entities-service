import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerDto } from './dto/manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Get()
  async findAll(): Promise<ManagerDto[]> {
    return this.managerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ManagerDto> {
    return this.managerService.findOne(id);
  }

  @Post()
  async create(@Body() manager: CreateManagerDto): Promise<ManagerDto> {
    return this.managerService.create(manager);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() manager: UpdateManagerDto): Promise<ManagerDto> {
    return this.managerService.update(id, manager);
  }
}
