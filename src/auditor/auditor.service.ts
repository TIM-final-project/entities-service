import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditorEntity } from './auditor.entity';
import { CreateAuditorDto } from './dto/create-auditor.dto';
import { UpdateAuditorDto } from './dto/update-auditor.dto';

@Injectable()
export class AuditorService {
  private readonly logger = new Logger(AuditorService.name);

  constructor(
    @InjectRepository(AuditorEntity)
    private auditorRepository: Repository<AuditorEntity>,
  ) {}

  /**
   * The `findAll` function returns a promise that resolves to an array of `AuditorEntity` objects with
   * their associated `address` relations, where the `active` property is true.
   * @returns The `findAll()` method is returning a Promise that resolves to an array of
   * `AuditorEntity` objects.
   */
  findAll(): Promise<AuditorEntity[]> {
    return this.auditorRepository.find({
      where: {
        active: true,
      },
      relations: ['address']
    });
  }

  /**
   * The function findOne retrieves an auditor entity with a specific id, including its address, and
   * throws an error if no auditor is found.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * auditor entity that needs to be retrieved.
   * @returns a Promise that resolves to an instance of the AuditorEntity class.
   */
  async findOne(id: number): Promise<AuditorEntity> {
    this.logger.debug('Getting auditor', { id });
    const auditor = await this.auditorRepository.findOne(id, {
      where: {
        active: true
      },
      relations: ['address']
    });
    if (auditor) {
      return auditor;
    } else {
      this.logger.error('Error getting auditor', { id });
      throw new RpcException({
        message: `No existe un auditor con el id: ${id}`
      });
    }
  }

  /**
   * The function creates a new auditor entity and saves it to the auditor repository.
   * @param {CreateAuditorDto} auditorDto - The `auditorDto` parameter is an object of type
   * `CreateAuditorDto`. It contains the data needed to create a new `AuditorEntity` object.
   * @returns a Promise that resolves to an instance of the AuditorEntity class.
   */
  create(auditorDto: CreateAuditorDto): Promise<AuditorEntity> {
    this.logger.debug('Creating auditor', { auditorDto });
    return this.auditorRepository.save(auditorDto as AuditorEntity);
  }

  /**
   * This function updates an auditor entity in the database based on the provided ID and DTO.
   * @param {number} id - The id parameter is a number that represents the unique identifier of the
   * auditor entity that needs to be updated.
   * @param {UpdateAuditorDto} auditorDto - The `auditorDto` parameter is an object of type
   * `UpdateAuditorDto` which contains the updated information for the auditor.
   * @returns a Promise that resolves to an instance of the AuditorEntity class.
   */
  async update(
    id: number,
    auditorDto: UpdateAuditorDto,
  ): Promise<AuditorEntity> {
    const auditor: AuditorEntity = await this.auditorRepository.findOne(id);
    
    if (auditor) {
      this.auditorRepository.merge(auditor, auditorDto);
      try {
        return await this.auditorRepository.save(auditor);
      } catch (error) {
        this.logger.error('Error updating auditor', { error });
        throw new RpcException({
          message: `No es posible modificar el auditor`,
        })
      }
    } else {
      this.logger.error('Error getting auditor', { id });
      throw new RpcException({
        message: `No existe un auditor con el id: ${id}`
      });
    }
  }
}
