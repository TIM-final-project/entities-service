import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AuditorService } from './auditor.service';
import { AuditorDto } from './dto/auditor.dto';
import { CreateAuditorDto } from './dto/create-auditor.dto';
import { UpdateAuditorDto } from './dto/update-auditor.dto';

@Controller('auditors')
export class AuditorController {
  private readonly logger = new Logger(AuditorController.name);

  constructor(private auditorService: AuditorService) {}

  // @Get()
  @MessagePattern('auditors_find_all')
  async findAll(): Promise<AuditorDto[]> {
    return await this.auditorService.findAll();
  }

  // @Get(':id')
  @MessagePattern('auditors_find_by_id')
  async finOne(@Body('id') id: number): Promise<AuditorDto> {
    return await this.auditorService.findOne(id);
  }

  // @Post()
  @MessagePattern('auditors_create')
  async create(@Body() auditor: CreateAuditorDto): Promise<AuditorDto> {
    this.logger.debug('Creating Contractor', { auditor });
    try {
      return await this.auditorService.create(auditor);
    } catch (error) {
      this.logger.error('Error creating auditor', { error });
      throw new RpcException({
        message: 'Ya existe un auditor con el CUIT ingresado'
      });
    }
  }

  // @Put(':id')
  @MessagePattern('auditors_update')
  async update(@Body() auditor: UpdateAuditorDto) {
    console.log('Update auditor request ', { ...auditor });
    const { id } = auditor;
    delete auditor.id;
    return await this.auditorService.update(id, auditor);
  }
}
