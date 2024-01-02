import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShittyManagerDto } from './dto/create-shitty-manager.dto';
import { UpdateShittyManagerDto } from './dto/update-shitty-manager.dto';
import { ShittyManagerEntity } from './shitty-manager.entity';
import { ShittyManagerQPs } from './dto/shitty-manager.qps';

@Injectable()
export class ShittyManagerService {
  private readonly logger = new Logger(ShittyManagerService.name);

  constructor(
    @InjectRepository(ShittyManagerEntity)
    private managerRepository: Repository<ShittyManagerEntity>,
  ) {}

/**
 * The `findAll` function returns a promise that resolves to an array of `ShittyManagerEntity` objects
 * with their associated `address` relation, where the `active` property is true.
 * @returns The `findAll()` method is returning a Promise that resolves to an array of
 * `ShittyManagerEntity` objects.
 */
  findAll(shittyManagerQPs : ShittyManagerQPs): Promise<ShittyManagerEntity[]> {
    this.logger.debug('Getting all managers', { shittyManagerQPs });
    return this.managerRepository.find({
      where: {
        active: true,
        ...shittyManagerQPs
      },
      relations: ['address']
    });
  }

/**
 * The function `findOne` retrieves a manager entity with a specific ID, including its related address,
 * and throws an error if the manager does not exist.
 * @param {number} id - The `id` parameter is the unique identifier of the manager that we want to
 * find.
 * @returns a Promise that resolves to a ShittyManagerEntity object.
 */
  async findOne(id: number): Promise<ShittyManagerEntity> {
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
 * The function creates a new ShittyManagerEntity object based on the provided CreateShittyManagerDto
 * and saves it to the managerRepository.
 * @param {CreateShittyManagerDto} managerDto - The `managerDto` parameter is an object of type
 * `CreateShittyManagerDto`. It is used to pass the data required to create a new `ShittyManagerEntity`
 * object.
 * @returns a Promise that resolves to a ShittyManagerEntity object.
 */
  create(managerDto: CreateShittyManagerDto): Promise<ShittyManagerEntity> {
    const manager: ShittyManagerEntity = managerDto;
    return this.managerRepository.save(manager);
  }

/**
 * This function updates a ShittyManagerEntity with the provided id and managerDto, and returns the
 * updated entity.
 * @param {number} id - The id of the ShittyManagerEntity that needs to be updated.
 * @param {UpdateShittyManagerDto} managerDto - The `managerDto` parameter is an object that contains
 * the updated data for the ShittyManagerEntity. It is of type `UpdateShittyManagerDto`.
 * @returns The `update` function returns a Promise that resolves to a `ShittyManagerEntity` object.
 */
  async update(
    id: number,
    managerDto: UpdateShittyManagerDto,
  ): Promise<ShittyManagerEntity> {
    const manager: ShittyManagerEntity = await this.managerRepository.findOne(id, {
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
        this.logger.error('Error updating shitty manager', { error });
        throw new RpcException({
          message: `No es posible modificar el encargado`,
        })
      }
    } else {
      this.logger.error('Error getting shitty manager', { id });
      throw new RpcException({
        message: `No existe un encargado con el id: ${id}`,
      })
    }
  }
}
