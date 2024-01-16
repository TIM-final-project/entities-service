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

  /**
   * This function finds all vehicle entities based on the given query parameters.
   * @param {VehiclesQPs} vehicleQPs - The parameter `vehicleQPs` is an object that represents the
   * query parameters for finding vehicles. It may have the following properties:
   * @returns The function `findAll` returns a Promise that resolves to an array of `VehicleEntity`
   * objects.
   */
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

  /**
   * The function findOne retrieves a vehicle entity by its id, with optional query parameters, and
   * returns it as a promise.
   * @param {number} id - The `id` parameter is the unique identifier of the vehicle that you want to
   * find. It is of type `number`.
   * @param {VehiclesQPs} [vehicleQPs] - vehicleQPs is an optional parameter of type VehiclesQPs. It is
   * used to specify additional query parameters for retrieving the vehicle entity.
   * @returns a Promise that resolves to a VehicleEntity object.
   */
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

  /**
   * This function creates a vehicle entity associated with a contractor entity and returns the created
   * vehicle.
   * @param {number} contractorId - The contractorId parameter is a number that represents the ID of
   * the contractor associated with the vehicle being created.
   * @param {CreateVehicleDto} vehicleDto - The vehicleDto parameter is an object of type
   * CreateVehicleDto. It contains the information needed to create a new vehicle, such as the
   * vehicle's plate number, make, model, and year.
   * @returns a Promise that resolves to a VehicleEntity object.
   */
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

  /**
   * The `update` function updates a vehicle entity in the database based on the provided ID and
   * vehicle data.
   * @param {number} id - The id parameter is a number that represents the unique identifier of the
   * vehicle that needs to be updated.
   * @param {UpdateVehicleDto} vehicleDto - The `vehicleDto` parameter is an object of type
   * `UpdateVehicleDto` which contains the updated information for a vehicle.
   * @returns a Promise that resolves to a VehicleEntity object.
   */
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
