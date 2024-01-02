import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSecurityDto } from './dto/create-security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { SecurityEntity } from './security.entity';
import { SecurityQPs } from './dto/security.qps';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(
    @InjectRepository(SecurityEntity)
    private securityRepository: Repository<SecurityEntity>,
  ) {}

  /**
   * The `findAll` function returns a promise that resolves to an array of `SecurityEntity` objects
   * with their associated `address` relation, where the `active` property is true.
   * @returns The `findAll()` method is returning a Promise that resolves to an array of
   * `SecurityEntity` objects.
   */
  findAll(securityQPs : SecurityQPs ): Promise<SecurityEntity[]> {
    this.logger.debug('Security find all', { securityQPs });
    return this.securityRepository.find({
      where: {
        active: true,
        ...securityQPs
      },
      relations: ['address'],
    });
  }

  /**
   * The function `findOne` retrieves a security entity with a specific ID, including its related
   * address, and throws an error if the entity does not exist.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * security entity that we want to retrieve.
   * @returns a Promise that resolves to a SecurityEntity object.
   */
  async findOne(id: number): Promise<SecurityEntity> {
    this.logger.debug('Getting security', { id });
    const security = await this.securityRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address'],
    });

    if (security) {
      return security;
    } else {
      this.logger.error('Error Getting security', { id });
      throw new RpcException({
        message: `No existe un guardia con el id: ${id}`,
      });
    }
  }

  /**
   * The function creates a security entity and saves it to the security repository, but throws an
   * error if a security entity with the same cuit already exists.
   * @param {CreateSecurityDto} securityDto - The parameter `securityDto` is of type
   * `CreateSecurityDto`. It is an object that contains the data needed to create a security entity.
   * @returns a Promise that resolves to a SecurityEntity object.
   */
  async create(securityDto: CreateSecurityDto): Promise<SecurityEntity> {
    try{
      const security: SecurityEntity = securityDto;
      return await this.securityRepository.save(security);

    } catch (error) {
      this.logger.error('Error creating security', { error });
      throw new RpcException({
        message: `Ya existe un guardia con cuit: ${securityDto.cuit}`,
      });
    }
  }

  /**
   * The function updates a security entity with the provided ID and security data, and returns the
   * updated entity.
   * @param {number} id - The ID of the security entity that needs to be updated.
   * @param {UpdateSecurityDto} securityDto - The `securityDto` parameter is an object of type
   * `UpdateSecurityDto` which contains the updated information for a security entity.
   * @returns a Promise that resolves to a SecurityEntity object.
   */
  async update(
    id: number,
    securityDto: UpdateSecurityDto,
  ): Promise<SecurityEntity> {
    const security: SecurityEntity = await this.securityRepository.findOne(id, {
      where: {
        active: true,
      },
      relations: ['address'],
    });

    if (security) {
      this.securityRepository.merge(security, securityDto);
      try {
        return await this.securityRepository.save(security);
      } catch (error) {
        this.logger.error('Error updating security', { error });
        throw new RpcException({
          message: `No es posible modificar al guardia`,
        });
      }
    } else {
      this.logger.error('Error Getting security', { id });
      throw new RpcException({
        message: `No existe un guardia con el id: ${id}`,
      });
    }
  }
}
