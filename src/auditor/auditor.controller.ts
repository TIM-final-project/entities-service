import { Body, Controller, Logger } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { AuditorEntity } from './auditor.entity';
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
    const auditors: AuditorEntity[] = await this.auditorService.findAll();
    return auditors.map((auditor: AuditorEntity) => plainToInstance(AuditorDto, auditor));
  }

  // @Get(':id')
  @MessagePattern('auditors_find_by_id')
  async finOne(@Body('id') id: number): Promise<AuditorDto> {
    return plainToInstance(AuditorDto, await this.auditorService.findOne(id));
  }

  // @Post()
  @MessagePattern('auditors_create')
  async create(@Body() auditor: CreateAuditorDto): Promise<AuditorDto> {
    this.logger.debug('Creating Contractor', { auditor });
    try {
      return plainToInstance(AuditorDto, await this.auditorService.create(auditor));
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
    return this.auditorService.update(id, auditor);
  }
}
