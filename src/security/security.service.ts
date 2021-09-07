import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSecurityDto } from './dto/create-security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { SecurityEntity } from './security.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(SecurityEntity)
    private securityRepository: Repository<SecurityEntity>,
  ) {}

  findAll(): Promise<SecurityEntity[]> {
    return this.securityRepository.find();
  }

  findOne(id: number): Promise<SecurityEntity> {
    return this.securityRepository.findOne(id);
  }

  create(securityDto: CreateSecurityDto): Promise<SecurityEntity> {
    const security: SecurityEntity = securityDto;
    return this.securityRepository.save(security);
  }

  async update(
    id: number,
    securityDto: UpdateSecurityDto,
  ): Promise<SecurityEntity> {
    const security: SecurityEntity = await this.securityRepository.findOne(id);
    this.securityRepository.merge(security, securityDto);
    return this.securityRepository.save(security);
  }
}
