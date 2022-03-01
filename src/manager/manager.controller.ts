import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerDto } from './dto/manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';

@Controller('managers')
export class ManagerController {
  private readonly logger = new Logger(ManagerController.name);

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
    this.logger.debug('Creating manager', { manager });
    try {
      return await this.managerService.create(manager);
    } catch (error) {
      this.logger.error('Error Creating manager', { error });
      throw new RpcException({
        message: 'Ya existe un encargado con el CUIT ingresado.',
      });
    }
  }

  // @Put(':id')
  @MessagePattern('managers_update')
  async update(
    updateDTO: {id: number, dto: UpdateManagerDto },
  ): Promise<ManagerDto> {
    console.log('Update manager request ', updateDTO.dto);
    return this.managerService.update(updateDTO.id, updateDTO.dto);
  }
}
