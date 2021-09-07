import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditorEntity } from './auditor.entity';
import { CreateAuditorDto } from './dto/create-auditor.dto';
import { UpdateAuditorDto } from './dto/update-auditor.dto';

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

  create(auditorDto: CreateAuditorDto): Promise<AuditorEntity> {
    return this.auditorRepository.save(auditorDto as AuditorEntity);
  }

  async update(
    id: number,
    auditorDto: UpdateAuditorDto,
  ): Promise<AuditorEntity> {
    const auditor: AuditorEntity = await this.auditorRepository.findOne(id);
    this.auditorRepository.merge(auditor, auditorDto);
    return this.auditorRepository.save(auditor);
  }
}
