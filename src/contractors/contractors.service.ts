import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractorEntity } from './contractor.entity';
import { ContractorDto } from './dto/contractor.dto';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

@Injectable()
export class ContractorsService {
  private readonly logger = new Logger(ContractorsService.name);

  constructor(
    @InjectRepository(ContractorEntity)
    private contractorRepository: Repository<ContractorEntity>,
  ) {}

  findAll(): Promise<ContractorEntity[]> {
    return this.contractorRepository.find({
      relations: ['drivers', 'vehicles'],
    });
  }

  findOne(id: number): Promise<ContractorEntity> {
    return this.contractorRepository.findOne(id, {
      relations: ['drivers', 'vehicles'],
    });
  }

  create(contractorDTO: CreateContractorDto): Promise<ContractorEntity> {
    this.logger.debug('Creating contractor', { contractorDTO });
    return this.contractorRepository.save(contractorDTO as ContractorEntity);
  }

  async update(
    id: number,
    contractorDTO: UpdateContractorDto,
  ): Promise<ContractorEntity> {
    const { cuit } = contractorDTO;
    const contractor: ContractorEntity =
      await this.contractorRepository.findOne(id);
    if (contractor) {
      this.contractorRepository.merge(contractor, contractorDTO);
      return this.contractorRepository.save(contractor);
    } else {
      this.logger.error(`Error updating Contractor ${id}`);
      throw new RpcException({
        message: `No existe el contratista ${id}`,
      });
    }
  }
}
