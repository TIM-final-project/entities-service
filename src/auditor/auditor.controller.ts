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
  /* The `@MessagePattern('auditors_find_all')` decorator is used to define a message pattern for a
  method in a NestJS controller. In this case, it is defining the message pattern for the `findAll`
  method in the `AuditorController` class. */
  @MessagePattern('auditors_find_all')
  async findAll(): Promise<AuditorDto[]> {
    const auditors: AuditorEntity[] = await this.auditorService.findAll();
    return auditors.map((auditor: AuditorEntity) => plainToInstance(AuditorDto, auditor));
  }

  // @Get(':id')
  /* The `@MessagePattern('auditors_find_by_id')` decorator is used to define a message pattern for the
  `findOne` method in the `AuditorController` class. This means that when a message with the pattern
  `'auditors_find_by_id'` is received by the microservice, it will be routed to this method. */
  @MessagePattern('auditors_find_by_id')
  async finOne(id: number): Promise<AuditorDto> {
    return plainToInstance(AuditorDto, await this.auditorService.findOne(id));
  }



  // @Post()
  /* The `@MessagePattern('auditors_create')` decorator is used to define a message pattern for the
  `create` method in the `AuditorController` class. This means that when a message with the pattern
  `'auditors_create'` is received by the microservice, it will be routed to this method. */
  @MessagePattern('auditors_create')
  async create(auditor: CreateAuditorDto): Promise<AuditorDto> {
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
  /* The `@MessagePattern('auditors_update')` decorator is used to define a message pattern for the
  `update` method in the `AuditorController` class. This means that when a message with the pattern
  `'auditors_update'` is received by the microservice, it will be routed to this method. */
  @MessagePattern('auditors_update')
  async update(    
    updateDTO: {id: number, dto: UpdateAuditorDto }
  ) {
    this.logger.debug('Updating auditor request ', updateDTO);
    return this.auditorService.update(updateDTO.id, updateDTO.dto);
  }
}
