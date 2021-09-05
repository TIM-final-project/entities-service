import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditorEntity } from './auditor.entity';
import { CreateAuditorInput } from './dto/create-auditor.dto';
import { UpdateAuditorInput } from './dto/update-auditor.dto';

@Injectable()
export class AuditorService {
  constructor(
    @InjectRepository(AuditorEntity)
    private auditorRepository: Repository<AuditorEntity>,
  ) {}

  findAll(): Promise<AuditorEntity[]> {
    return this.auditorRepository.find();
  }

  findOne(id: number): Promise<AuditorEntity> {
    return this.auditorRepository.findOne(id);
  }

  create(auditorInputDTO: CreateAuditorInput): Promise<AuditorEntity> {
    return this.auditorRepository.save(auditorInputDTO as AuditorEntity);
  }

  async update(
    id: number,
    auditorInputDTO: UpdateAuditorInput,
  ): Promise<AuditorEntity> {
    const auditor: AuditorEntity = await this.auditorRepository.findOne(id);
    this.auditorRepository.merge(auditor, auditorInputDTO);
    return this.auditorRepository.save(auditor);
  }
}
