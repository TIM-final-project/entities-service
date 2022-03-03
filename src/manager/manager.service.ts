import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerEntity } from './manager.entity';

@Injectable()
export class ManagerService {
  private readonly logger = new Logger(ManagerService.name);

  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}

  findAll(): Promise<ManagerEntity[]> {
    return this.managerRepository.find({
      where: {
        active: true,
      },
      relations: ['address']
    });
  }

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

  create(managerDto: CreateManagerDto): Promise<ManagerEntity> {
    const manager: ManagerEntity = managerDto;
    return this.managerRepository.save(manager);
  }

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
