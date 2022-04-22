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

  findAll(): Promise<ExpeditorEntity[]> {
    return this.ExpeditorRepository.find({
      where: {
        active: true,
      },
      relations: ['address']
    });
  }

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

  create(ExpeditorDto: CreateExpeditorDTO): Promise<ExpeditorEntity> {
    const Expeditor: ExpeditorEntity = ExpeditorDto;
    return this.ExpeditorRepository.save(Expeditor);
  }

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
