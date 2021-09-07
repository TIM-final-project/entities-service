import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { ContractorsService } from 'src/contractors/contractors.service';
import { Repository } from 'typeorm';
import { DriverEntity } from './driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @Inject(ContractorsService)
    private contractorsService: ContractorsService,
  ) {}

  findAll(): Promise<DriverEntity[]> {
    return this.driverRepository.find({ relations: ["contractor"] });
  }

  findOne(id: number): Promise<DriverEntity> {
    return this.driverRepository.findOne(id, { relations: ["contractor"] });
  }

  async create(contractorId: number, driverDto: CreateDriverDto): Promise<DriverEntity> {
    const contractor: ContractorEntity = await this.contractorsService.findOne(contractorId);
    const driver: DriverEntity = driverDto;
    driver.contractor = contractor;
    return this.driverRepository.save(driver);
  }

  async update(
    id: number,
    driverDto: UpdateDriverDto,
  ): Promise<DriverEntity> {
    const driver: DriverEntity = await this.driverRepository.findOne(id);
    this.driverRepository.merge(driver, driverDto);
    return this.driverRepository.save(driver);
  }
}
