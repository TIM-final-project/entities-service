import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerEntity } from './manager.entity';
import { ManagerQPs } from './dto/manager.qps';

@Injectable()
export class ManagerService {
  private readonly logger = new Logger(ManagerService.name);

  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}

  /**
   * The `findAll` function returns a promise that resolves to an array of `ManagerEntity` objects with
   * their associated `address` relation, where the `active` property is true.
   * @returns The `findAll()` method is returning a Promise that resolves to an array of
   * `ManagerEntity` objects.
   */
  findAll(managerQPs : ManagerQPs): Promise<ManagerEntity[]> {
    this.logger.debug('Getting all managers', { managerQPs });
    return this.managerRepository.find({
      where: {
        active: true,
        ...managerQPs
      },
      relations: ['address']
    });
  }

  /**
   * The function findOne retrieves a manager entity with a specific id, including its related address,
   * and throws an error if the manager does not exist.
   * @param {number} id - The `id` parameter is the unique identifier of the manager that we want to
   * retrieve from the database.
   * @returns a Promise that resolves to a ManagerEntity object.
   */
  async findOne(id: number): Promise<ManagerEntity> {
    this.logger.debug('Getting manager', { id });
    const manager = await this.managerRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address']
    });

    if (manager) {
      return manager;
    } else {
      this.logger.error('Error getting manager', { id });
      throw new RpcException({
        message: `No existe un encargado con el id: ${id}`,
      })
    }
  }

  /**
   * The function creates a new manager entity using the provided manager DTO and saves it to the
   * manager repository.
   * @param {CreateManagerDto} managerDto - The `managerDto` parameter is an object of type
   * `CreateManagerDto` which contains the data needed to create a new manager.
   * @returns a Promise that resolves to a ManagerEntity.
   */
  create(managerDto: CreateManagerDto): Promise<ManagerEntity> {
    const manager: ManagerEntity = managerDto;
    return this.managerRepository.save(manager);
  }

  /**
   * The `update` function updates a manager entity with the provided data and returns the updated
   * entity.
   * @param {number} id - The id of the manager that needs to be updated. It is a number.
   * @param {UpdateManagerDto} managerDto - The `managerDto` parameter is an object that contains the
   * updated information for the manager. It is of type `UpdateManagerDto`.
   * @returns a Promise that resolves to a ManagerEntity object.
   */
  async update(
    id: number,
    managerDto: UpdateManagerDto,
  ): Promise<ManagerEntity> {
    const manager: ManagerEntity = await this.managerRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address']
    });
    if (manager) {
      this.managerRepository.merge(manager, managerDto);
      try {
        return await this.managerRepository.save(manager);
      } catch (error) {
        this.logger.error('Error updating manager', { error });
        throw new RpcException({
          message: `No es posible modificar el encargado`,
        })
      }
    } else {
      this.logger.error('Error getting manager', { id });
      throw new RpcException({
        message: `No existe un encargado con el id: ${id}`,
      })
    }
  }
}
