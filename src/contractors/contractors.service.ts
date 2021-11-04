import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ContractorEntity } from './contractor.entity';
import { ContractorQPs } from './dto/contracto.qps';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { ContractorQuery } from './interfaces/contractor-query.interface';

@Injectable()
export class ContractorsService {
  private readonly logger = new Logger(ContractorsService.name);

  constructor(
    @InjectRepository(ContractorEntity)
    private contractorRepository: Repository<ContractorEntity>,
  ) {}

  findAll(contractorQPs?: ContractorQPs): Promise<ContractorEntity[]> {
    let relations = contractorQPs?.relations ? contractorQPs.relations.split(',') : [];

    const where: ContractorQuery = {
      active: true,
    }

    if (contractorQPs?.contractorIds?.length) {
      where.id = In(contractorQPs.contractorIds);
    }

    return this.contractorRepository.find({
      where,
      relations,
    });
  }

  async findOne(id: number, contractorQPs?: ContractorQPs): Promise<ContractorEntity> {
    this.logger.debug('Getting contractor', { id , contractorQPs });
    let relations = contractorQPs?.relations ? contractorQPs.relations.split(',') : [];
    const contractor = await this.contractorRepository.findOne(id, {
      where: {
        active: true
      },
      relations,
    });
    if (contractor) {
      return contractor;
    } else {
      this.logger.error('Error Getting contractor', { id });
      throw new RpcException({
        message: `No existe un contratista con el id: ${id}`,
      });
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
    this.logger.debug('Attempt to update contractor.', { id, contractorDTO });
    const { cuit } = contractorDTO;
    const contractor: ContractorEntity =
      await this.contractorRepository.findOne(id, {
        where: {
          active: true
        },
        relations: ['address']
      });
    if (contractor) {
      this.contractorRepository.merge(contractor, contractorDTO);
      this.logger.debug('Contractor after merge', { contractor });
      try {
        return await this.contractorRepository.save(contractor);
      } catch (error) {
        this.logger.error('Error updating Contractor', { error });
        throw new RpcException({
          message: `Ya existe un contratista con el cuit: ${cuit}`,
        });
      }
    } else {
      this.logger.error(`Error updating Contractor ${id}`);
      throw new RpcException({
        message: `No existe el contratista ${id}`,
      });
    }
  }
}
