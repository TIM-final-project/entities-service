import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToClass, plainToInstance } from 'class-transformer';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { ContractorsService } from 'src/contractors/contractors.service';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesQPs } from './dto/vehicle.qps';
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

  findAll(vehicleQPs: VehiclesQPs): Promise<VehicleEntity[]> {
    this.logger.debug('Drivers find all', { vehicleQPs });
    let relations = vehicleQPs?.relations ? vehicleQPs.relations.split(',') : [];
    let ids = vehicleQPs?.ids ? vehicleQPs.ids : [];
    delete vehicleQPs?.relations;
    delete vehicleQPs?.ids;

    if(ids.length){
      return this.vehicleRepository.findByIds(ids,{
        where: { active: true, ...vehicleQPs},
        relations
      });
    }

    relations.push('type');

    return this.vehicleRepository.find({ 
      where: {
        active: true,
        ...vehicleQPs
      },
      relations
    });
  }

  async findOne(id: number, vehicleQPs?: VehiclesQPs): Promise<VehicleEntity> {
    this.logger.debug('Getting vehicle', { id, vehicleQPs });
    let relations = vehicleQPs?.relations ? vehicleQPs.relations.split(',') : [];

    const vehicle = await this.vehicleRepository.findOne(id, {
      relations
    });

    relations.push('type');

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
    const vehicle: VehicleEntity = await this.vehicleRepository.findOne(id);
    
    if (vehicle) {
      this.vehicleRepository.merge(vehicle, vehicleDto);
      try {
        return await this.vehicleRepository.save(vehicle);
      } catch (error) {
        this.logger.error('Error updating vehicle', { id });
        throw new RpcException({
          message: `No es posible modificar el vehiculo`
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
