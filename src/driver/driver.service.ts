import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { ContractorsService } from 'src/contractors/contractors.service';
import { Repository } from 'typeorm';
import { DriverEntity } from './driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @Inject()
    private contractorsService: ContractorsService,
  ) {}

  findAll(): Promise<DriverEntity[]> {
    return this.driverRepository.find();
  }

  findOne(id: number): Promise<DriverEntity> {
    return this.driverRepository.findOne(id);
  }

  async create(contractorId: number, driverInputDto: CreateDriverInput): Promise<DriverEntity> {
    const contractor: ContractorEntity = await this.contractorsService.findOne(contractorId);
    const driver: DriverEntity = driverInputDto;
    driver.contractor = contractor;
    return this.driverRepository.save(driver);
  }

  async update(
    id: number,
    driverInputDto: UpdateDriverInput,
  ): Promise<DriverEntity> {
    const driver: DriverEntity = await this.driverRepository.findOne(id);
    this.driverRepository.merge(driver, driverInputDto);
    return this.driverRepository.save(driver);
  }
}
