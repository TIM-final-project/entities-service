import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { ContractorsService } from 'src/contractors/contractors.service';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './vehicle.entity';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
    @Inject(ContractorsService)
    private contractorsService: ContractorsService,
  ) {}

  findAll(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.find({ relations: ['contractor'] });
  }

  async findOne(id: number): Promise<VehicleEntity> {
    this.logger.debug('Getting vehicle', { id });
    const vehicle = await this.vehicleRepository.findOne(id, {
      relations: ['contractor'],
    });

    if (vehicle) {
      return vehicle;
    } else {
      this.logger.error('Error getting vehicle', { id });
      throw new RpcException({
        message: `No existe un vehiculo con el id: ${id}`,
      });
    }
  }

  async create(
    contractorId: number,
    vehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    this.logger.debug('Creating vehicle', { contractorId, vehicleDto });

    const contractor: ContractorEntity = await this.contractorsService.findOne(
      contractorId,
    );
    this.logger.debug(`Contractor ${contractorId} found`, { contractor });
    
    try {
      const vehicle: VehicleEntity = vehicleDto;
      vehicle.contractor = contractor;
      return await this.vehicleRepository.save(vehicle);
    } catch (error) {
      this.logger.error('Error creating vehicle', { error });
      throw new RpcException({
        message: `Ya existe un vehiculo con la patente: ${vehicleDto.plate}`,
      });
    }
  }

  async update(
    id: number,
    vehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    const { plate } = vehicleDto;
    const vehicle: VehicleEntity = await this.vehicleRepository.findOne(id);
    
    if (vehicle) {
      this.vehicleRepository.merge(vehicle, vehicleDto);
      try {
        return await this.vehicleRepository.save(vehicle);
      } catch (error) {
        this.logger.error('Error updating vehicle', { id });
        throw new RpcException({
          message: `Ya existe un vehiculo con la patente: ${plate}`,
        });
      }
    } else {
      this.logger.error('Error creating vehicle', { id });
      throw new RpcException({
        message: `No existe un vehiculo con el id: ${id}`,
      });
    }    
  }
}
