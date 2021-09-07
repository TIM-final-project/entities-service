import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { ContractorsService } from 'src/contractors/contractors.service';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
    @Inject(ContractorsService)
    private contractorsService: ContractorsService,
  ) {}

  findAll(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.find({ relations: ['contractor'] });
  }

  findOne(id: number): Promise<VehicleEntity> {
    return this.vehicleRepository.findOne(id, { relations: ['contractor'] });
  }

  async create(
    contractorId: number,
    vehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    const contractor: ContractorEntity = await this.contractorsService.findOne(
      contractorId,
    );
    const vehicle: VehicleEntity = vehicleDto;
    vehicle.contractor = contractor;
    return this.vehicleRepository.save(vehicle);
  }

  async update(
    id: number,
    vehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle: VehicleEntity = await this.vehicleRepository.findOne(id);
    this.vehicleRepository.merge(vehicle, vehicleDto);
    return this.vehicleRepository.save(vehicle);
  }
}
