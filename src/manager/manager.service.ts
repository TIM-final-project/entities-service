import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
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

  create(managerDto: CreateManagerDto): Promise<ManagerEntity> {
    const manager: ManagerEntity = managerDto;
    return this.managerRepository.save(manager);
  }

  async update(
    id: number,
    managerDto: UpdateManagerDto,
  ): Promise<ManagerEntity> {
    const manager: ManagerEntity = await this.managerRepository.findOne(id);
    this.managerRepository.merge(manager, managerDto);
    return this.managerRepository.save(manager);
  }
}
