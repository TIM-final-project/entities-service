import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditorEntity } from './auditor.entity';
import { CreateAuditorDto } from './dto/create-auditor.dto';
import { UpdateAuditorDto } from './dto/update-auditor.dto';

@Injectable()
export class AuditorService {
  private readonly logger = new Logger(AuditorService.name);

  constructor(
    @InjectRepository(AuditorEntity)
    private auditorRepository: Repository<AuditorEntity>,
  ) {}

  findAll(): Promise<AuditorEntity[]> {
    return this.auditorRepository.find({
      where: {
        active: true
      },
      relations: ['address']
    });
  }

  async findOne(id: number): Promise<AuditorEntity> {
    this.logger.debug('Getting auditor', { id });
    const auditor = await this.auditorRepository.findOne(id, {
      where: {
        active: true
      },
      relations: ['address']
    });
    if (auditor) {
      return auditor;
    } else {
      this.logger.error('Error getting auditor', { id });
      throw new RpcException({
        message: `No existe un auditor con el id: ${id}`
      });
    }
  }

  create(auditorDto: CreateAuditorDto): Promise<AuditorEntity> {
    this.logger.debug('Creating auditor', { auditorDto });
    return this.auditorRepository.save(auditorDto as AuditorEntity);
  }

  async update(
    id: number,
    auditorDto: UpdateAuditorDto,
  ): Promise<AuditorEntity> {
    const auditor: AuditorEntity = await this.auditorRepository.findOne(id);
    
    if (auditor) {
      this.auditorRepository.merge(auditor, auditorDto);
      try {
        return await this.auditorRepository.save(auditor);
      } catch (error) {
        this.logger.error('Error updating auditor', { error });
        throw new RpcException({
          message: `No es posible modificar el auditor`,
        })
      }
    } else {
      this.logger.error('Error getting auditor', { id });
      throw new RpcException({
        message: `No existe un auditor con el id: ${id}`
      });
    }
  }
}
