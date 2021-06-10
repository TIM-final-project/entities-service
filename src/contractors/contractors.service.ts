import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractorEntity } from './contractor.entity';
import { CreateContractorInput } from './dto/create-contractor.input';

@Injectable()
export class ContractorsService {
    constructor(
        @InjectRepository(ContractorEntity)
        private contractorRepository: Repository<ContractorEntity>
    ) {}

    findAll(): Promise<ContractorEntity[]> {
        return this.contractorRepository.find();
    }

    findOne(id: string): Promise<ContractorEntity> {
        return this.contractorRepository.findOne(id);
    }

    create(contractorInputDTO: CreateContractorInput): Promise<ContractorEntity> {
        const contractor: ContractorEntity = contractorInputDTO;
        return this.contractorRepository.save(contractor);
    }
}
