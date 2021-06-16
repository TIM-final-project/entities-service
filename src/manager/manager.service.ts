import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerInput } from './dto/create-manager.input';
import { UpdateManagerInput } from './dto/update-manager.input';
import { ManagerEntity } from './manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}

  findAll(): Promise<ManagerEntity[]> {
    return this.managerRepository.find();
  }

  findOne(id: number): Promise<ManagerEntity> {
    return this.managerRepository.findOne(id);
  }

  create(managerInputDTO: CreateManagerInput): Promise<ManagerEntity> {
    const manager: ManagerEntity = managerInputDTO;
    return this.managerRepository.save(manager);
  }

  async update(
    id: number,
    managerInputDTO: UpdateManagerInput,
  ): Promise<ManagerEntity> {
    const manager: ManagerEntity = await this.managerRepository.findOne(id);
    this.managerRepository.merge(manager, managerInputDTO);
    return this.managerRepository.save(manager);
  }
}
