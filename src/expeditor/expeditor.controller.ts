import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateExpeditorDTO } from './dto/expeditor-create.dto';
import { ExpeditorDTO } from './dto/expeditor.dto';
import { UpdateExpeditorDTO } from './dto/update-expeditor.dto';
import { ExpeditorService } from './expeditor.service';

@Controller('Expeditors')
export class ExpeditorController {
  private readonly logger = new Logger(ExpeditorController.name);

  constructor(private ExpeditorService: ExpeditorService) {}

  // @Get()
  @MessagePattern('expeditors_find_all')
  async findAll(): Promise<ExpeditorDTO[]> {
    return this.ExpeditorService.findAll();
  }

  // @Get(':id')
  @MessagePattern('expeditors_find_by_id')
  async findOne(@Body('id') id: number): Promise<ExpeditorDTO> {
    return this.ExpeditorService.findOne(id);
  }

  // @Post()
  @MessagePattern('expeditors_create')
  async create(@Body() Expeditor: CreateExpeditorDTO): Promise<ExpeditorDTO> {
    this.logger.debug('Creating Expeditor', { Expeditor });
    try {
      return await this.ExpeditorService.create(Expeditor);
    } catch (error) {
      this.logger.error('Error Creating Expeditor', { error });
      throw new RpcException({
        message: 'Ya existe un expedidor con el CUIT ingresado.',
      });
    }
  }

  // @Put(':id')
  @MessagePattern('expeditors_update')
  async update(
    updateDTO: {id: number, DTO: UpdateExpeditorDTO },
  ): Promise<ExpeditorDTO> {
    console.log('Update Expeditor request ', updateDTO.DTO);
    return this.ExpeditorService.update(updateDTO.id, updateDTO.DTO);
  }
}
