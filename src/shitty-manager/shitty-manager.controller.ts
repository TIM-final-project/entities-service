import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateShittyManagerDto } from './dto/create-shitty-manager.dto';
import { ShittyManagerDto } from './dto/shitty-manager.dto';
import { UpdateShittyManagerDto } from './dto/update-shitty-manager.dto';
import { ShittyManagerService } from './shitty-manager.service';

@Controller('shitty-managers')
export class ShittyManagerController {
  private readonly logger = new Logger(ShittyManagerController.name);

  constructor(private shittyManagerService: ShittyManagerService) {}

  // @Get()
  @MessagePattern('managers_find_all')
  async findAll(): Promise<ShittyManagerDto[]> {
    return this.shittyManagerService.findAll();
  }

  // @Get(':id')
  @MessagePattern('managers_find_by_id')
  async findOne(@Body('id') id: number): Promise<ShittyManagerDto> {
    return this.shittyManagerService.findOne(id);
  }

  // @Post()
  @MessagePattern('managers_create')
  async create(@Body() manager: CreateShittyManagerDto): Promise<ShittyManagerDto> {
    this.logger.debug('Creating manager', { manager });
    try {
      return await this.shittyManagerService.create(manager);
    } catch (error) {
      this.logger.error('Error Creating Shitty Manager', { error });
      throw new RpcException({
        message: 'Ya existe un encargado con el CUIT ingresado.',
      });
    }
  }

  // @Put(':id')
  @MessagePattern('managers_update')
  async update(
    updateDTO: {id: number, dto: UpdateShittyManagerDto },
  ): Promise<ShittyManagerDto> {
    console.log('Update manager request ', updateDTO.dto);
    return this.shittyManagerService.update(updateDTO.id, updateDTO.dto);
  }
}
