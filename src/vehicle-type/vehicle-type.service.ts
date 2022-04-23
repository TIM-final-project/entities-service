import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleTypeEntity } from './vehicle-type.entity';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleTypeEntity)
    private vehicleTypesRepository: Repository<VehicleTypeEntity>,
  ) {}

  findAll(): Promise<VehicleTypeEntity[]> {
    return this.vehicleTypesRepository.find();
  }

  findByEntity(appliesTo: number): Promise<VehicleTypeEntity[]> {
    return this.vehicleTypesRepository.find({
      where: {
        appliesTo
      }
    });
  }
}
