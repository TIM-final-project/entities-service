import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverEntity } from './driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
  ) {}

  findAll(): Promise<DriverEntity[]> {
    return this.driverRepository.find();
  }

  findOne(id: number): Promise<DriverEntity> {
    return this.driverRepository.findOne(id);
  }

  create(driverInputDto: CreateDriverInput): Promise<DriverEntity> {
    return this.driverRepository.save(driverInputDto as DriverEntity);
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
