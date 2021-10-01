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

  async findOne(id: number): Promise<ContractorEntity> {

    this.logger.debug('Getting contractor', { id });
    const contractor = await this.contractorRepository.findOne(id, {
      relations: ['drivers', 'vehicles'],
    });
    if (contractor) {
      return contractor;
    } else {
      this.logger.error('Error Getting contractor', { id });
      throw new RpcException({
        message: `No existe un contratista con el id: ${id}`,
      })
    }
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
      try {
        return await this.contractorRepository.save(contractor);
      } catch (error) {
        this.logger.error('Error updating Contractor', { error });
        throw new RpcException({
          message: `Ya existe un contratista con el cuit: ${contractorDTO.cuit}`,
        })
      }
    } else {
      this.logger.error(`Error updating Contractor ${id}`);
      throw new RpcException({
        message: `No existe el contratista ${id}`,
      });
    }
  }
}
