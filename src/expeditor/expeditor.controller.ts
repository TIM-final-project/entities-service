import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateExpeditorDTO } from './dto/expeditor-create.dto';
import { ExpeditorDTO } from './dto/expeditor.dto';
import { UpdateExpeditorDTO } from './dto/update-expeditor.dto';
import { ExpeditorService } from './expeditor.service';
import { ExpeditorQPs } from './dto/expeditor.qps';
import { plainToInstance } from 'class-transformer';
import { ExpeditorEntity } from './expeditor.entity';

@Controller('Expeditors')
export class ExpeditorController {
  private readonly logger = new Logger(ExpeditorController.name);

  constructor(private ExpeditorService: ExpeditorService) {}

  // @Get()
  @MessagePattern('expeditors_find_all')
  async findAll(expedirtorQPs : ExpeditorQPs): Promise<ExpeditorDTO[]> {
    this.logger.debug('Getting Expeditors', { expedirtorQPs });
    const expeditors: ExpeditorDTO[] = await this.ExpeditorService.findAll(
      expedirtorQPs,
    );
    return expeditors.map((expeditor: ExpeditorEntity) => 
    plainToInstance(ExpeditorDTO, expeditor));
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
    updateDTO: {id: number, dto: UpdateExpeditorDTO },
  ): Promise<ExpeditorDTO> {
    console.log('Update Expeditor request ', updateDTO.dto);
    return this.ExpeditorService.update(updateDTO.id, updateDTO.dto);
  }
}
