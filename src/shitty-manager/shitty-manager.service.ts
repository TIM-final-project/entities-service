import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShittyManagerDto } from './dto/create-shitty-manager.dto';
import { UpdateShittyManagerDto } from './dto/update-shitty-manager.dto';
import { ShittyManagerEntity } from './shitty-manager.entity';

@Injectable()
export class ShittyManagerService {
  private readonly logger = new Logger(ShittyManagerService.name);

  constructor(
    @InjectRepository(ShittyManagerEntity)
    private managerRepository: Repository<ShittyManagerEntity>,
  ) {}

  findAll(): Promise<ShittyManagerEntity[]> {
    return this.managerRepository.find({
      where: {
        active: true,
      },
      relations: ['address']
    });
  }

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

  create(managerDto: CreateShittyManagerDto): Promise<ShittyManagerEntity> {
    const manager: ShittyManagerEntity = managerDto;
    return this.managerRepository.save(manager);
  }

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
