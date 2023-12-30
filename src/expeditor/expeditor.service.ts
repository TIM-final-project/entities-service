import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpeditorDTO } from './dto/expeditor-create.dto';
import { UpdateExpeditorDTO } from './dto/update-expeditor.dto';
import { ExpeditorEntity } from './expeditor.entity';

@Injectable()
export class ExpeditorService {
  private readonly logger = new Logger(ExpeditorService.name);

  constructor(
    @InjectRepository(ExpeditorEntity)
    private ExpeditorRepository: Repository<ExpeditorEntity>,
  ) {}

  /**
   * The `findAll` function returns a promise that resolves to an array of `ExpeditorEntity` objects,
   * filtered by the `active` property and including the `address` relation.
   * @returns The `findAll()` method is returning a Promise that resolves to an array of
   * `ExpeditorEntity` objects.
   */
  findAll(): Promise<ExpeditorEntity[]> {
    return this.ExpeditorRepository.find({
      where: {
        active: true,
      },
      relations: ['address']
    });
  }

  /**
   * This function retrieves an ExpeditorEntity object with the specified id, including its related
   * address, and throws an error if no ExpeditorEntity is found.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * Expeditor entity that we want to retrieve.
   * @returns a Promise that resolves to an instance of the ExpeditorEntity class.
   */
  async findOne(id: number): Promise<ExpeditorEntity> {
    this.logger.debug('Getting Expeditor', { id });
    const Expeditor = await this.ExpeditorRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address']
    });

    if (Expeditor) {
      return Expeditor;
    } else {
      this.logger.error('Error getting Expeditor', { id });
      throw new RpcException({
        message: `No existe un encargado con el id: ${id}`,
      })
    }
  }

  /**
   * The function creates a new ExpeditorEntity object based on the provided CreateExpeditorDTO and
   * saves it to the ExpeditorRepository.
   * @param {CreateExpeditorDTO} ExpeditorDto - CreateExpeditorDTO is a data transfer object that
   * contains the information needed to create a new ExpeditorEntity. It likely includes properties
   * such as name, email, phone number, and address.
   * @returns a Promise that resolves to an instance of ExpeditorEntity.
   */
  create(ExpeditorDto: CreateExpeditorDTO): Promise<ExpeditorEntity> {
    const Expeditor: ExpeditorEntity = ExpeditorDto;
    return this.ExpeditorRepository.save(Expeditor);
  }

  /**
   * The function updates an ExpeditorEntity object with the provided data and returns the updated
   * object.
   * @param {number} id - The id parameter is a number that represents the unique identifier of the
   * Expeditor entity that needs to be updated.
   * @param {UpdateExpeditorDTO} ExpeditorDto - The `ExpeditorDto` parameter is an object that contains
   * the updated information for the Expeditor. It is of type `UpdateExpeditorDTO`.
   * @returns a Promise that resolves to an instance of the ExpeditorEntity class.
   */
  async update(
    id: number,
    ExpeditorDto: UpdateExpeditorDTO,
  ): Promise<ExpeditorEntity> {
    const Expeditor: ExpeditorEntity = await this.ExpeditorRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address']
    });
    if (Expeditor) {
      this.ExpeditorRepository.merge(Expeditor, ExpeditorDto);
      try {
        return await this.ExpeditorRepository.save(Expeditor);
      } catch (error) {
        this.logger.error('Error updating Expeditor', { error });
        throw new RpcException({
          message: `No es posible modificar el expedidor`,
        })
      }
    } else {
      this.logger.error('Error getting Expeditor', { id });
      throw new RpcException({
        message: `No existe un expedidor con el id: ${id}`,
      })
    }
  }
}
