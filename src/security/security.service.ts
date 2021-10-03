import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSecurityDto } from './dto/create-security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { SecurityEntity } from './security.entity';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(
    @InjectRepository(SecurityEntity)
    private securityRepository: Repository<SecurityEntity>,
  ) {}

  findAll(): Promise<SecurityEntity[]> {
    return this.securityRepository.find({
      where: {
        active: true,
      },
      relations: ['address'],
    });
  }

  async findOne(id: number): Promise<SecurityEntity> {
    this.logger.debug('Getting security', { id });
    const security = await this.securityRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address'],
    });

    if (security) {
      return security;
    } else {
      this.logger.error('Error Getting security', { id });
      throw new RpcException({
        message: `No existe un guardia con el id: ${id}`,
      });
    }
  }

  create(securityDto: CreateSecurityDto): Promise<SecurityEntity> {
    const security: SecurityEntity = securityDto;
    return this.securityRepository.save(security);
  }

  async update(
    id: number,
    securityDto: UpdateSecurityDto,
  ): Promise<SecurityEntity> {
    const { cuit } = securityDto;

    const security: SecurityEntity = await this.securityRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address'],
    });

    if (security) {
      this.securityRepository.merge(security, securityDto);
      try {
        return await this.securityRepository.save(security);
      } catch (error) {
        this.logger.error('Error updating security', { error });
        throw new RpcException({
          message: `Ya existe un guardia con el cuit: ${cuit}`,
        });
      }
    } else {
      this.logger.error('Error Getting security', { id });
      throw new RpcException({
        message: `No existe un guardia con el id: ${id}`,
      });
    }
  }
}
