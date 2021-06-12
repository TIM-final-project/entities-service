import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSecurityInput } from './dto/create-security.input';
import { UpdateSecurityInput } from './dto/update-security.input';
import { SecurityEntity } from './security.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(SecurityEntity)
    private securityRepository: Repository<SecurityEntity>,
  ) {}

  findAll(): Promise<SecurityEntity[]> {
    const response: Promise<SecurityEntity[]> = this.securityRepository.find();
    console.log('RESPONSE FIND ALL: ', response);
    return response;
    // return this.securityRepository.find();
  }

  findOne(id: number): Promise<SecurityEntity> {
    return this.securityRepository.findOne(id);
  }

  create(securityInputDTO: CreateSecurityInput): Promise<SecurityEntity> {
    console.log('INPUT: ', securityInputDTO);
    const security: SecurityEntity = securityInputDTO;
    return this.securityRepository.save(security);
  }

  async update(
    id: number,
    securityInputDTO: UpdateSecurityInput,
  ): Promise<SecurityEntity> {
    const security: SecurityEntity = await this.securityRepository.findOne(id);
    this.securityRepository.merge(security, securityInputDTO);
    return this.securityRepository.save(security);
  }
}
