import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerDto } from './dto/manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  // @Get()
  @MessagePattern('managers_find_all')
  async findAll(): Promise<ManagerDto[]> {
    return this.managerService.findAll();
  }

  // @Get(':id')
  @MessagePattern('managers_find_by_id')
  async findOne(@Body('id') id: number): Promise<ManagerDto> {
    return this.managerService.findOne(id);
  }

  // @Post()
  @MessagePattern('managers_create')
  async create(@Body() manager: CreateManagerDto): Promise<ManagerDto> {
    return this.managerService.create(manager);
  }

  // @Put(':id')
  @MessagePattern('managers_update')
  async update(@Body() manager: UpdateManagerDto): Promise<ManagerDto> {
    console.log('Update manager request ', { manager });
    const { id } = manager;
    delete manager.id;
    return this.managerService.update(id, manager);
  }
}
