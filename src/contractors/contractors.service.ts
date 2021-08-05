import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractorEntity } from './contractor.entity';
import { CreateContractorInput } from './dto/create-contractor.input';
import { UpdateContractorInput } from './dto/update-contractor.input';

@Injectable()
export class ContractorsService {
  constructor(
    @InjectRepository(ContractorEntity)
    private contractorRepository: Repository<ContractorEntity>,
  ) {}

  findAll(): Promise<ContractorEntity[]> {
    return this.contractorRepository.find({ relations: ["drivers", "vehicles"] });
  }

  findOne(id: number): Promise<ContractorEntity> {
    return this.contractorRepository.findOne(id, { relations: ["drivers", "vehicles"] });
  }

  create(contractorInputDTO: CreateContractorInput): Promise<ContractorEntity> {
    const contractor: ContractorEntity = contractorInputDTO;
    return this.contractorRepository.save(contractor);
  }

  async update(
    id: number,
    contractorInputDTO: UpdateContractorInput,
  ): Promise<ContractorEntity> {
    const { cuit } = contractorInputDTO;
    const contractor: ContractorEntity =
      await this.contractorRepository.findOne(id);
    this.contractorRepository.merge(contractor, contractorInputDTO);
    return this.contractorRepository.save(contractor);
  }
}
