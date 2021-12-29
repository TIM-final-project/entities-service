import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractorEntity } from 'src/contractors/contractor.entity';
import { ContractorsService } from 'src/contractors/contractors.service';
import { Repository } from 'typeorm';
import { DriverEntity } from './driver.entity';
import { DriversQPs } from './dto/driver.qps';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  private readonly logger = new Logger(DriverService.name);

  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    @Inject(ContractorsService)
    private contractorsService: ContractorsService,
  ) { }

  findAll(driverQPs: DriversQPs): Promise<DriverEntity[]> {
    let relations = driverQPs?.relations ? driverQPs.relations.split(',') : [];
    let ids = driverQPs?.ids ? driverQPs.ids : [];
    delete driverQPs?.relations;
    delete driverQPs?.ids;

    if (ids.length) {
      return this.driverRepository.findByIds(ids, {
        where: { active: true, ...driverQPs },
        relations
      });
    }

    return this.driverRepository.find({
      where: { active: true, ...driverQPs },
      relations
    });
  }

  async findOne(id: number, driverQPs?: DriversQPs): Promise<DriverEntity> {
    this.logger.debug('Getting driver', { id, driverQPs });
    let relations = driverQPs?.relations ? driverQPs.relations.split(',') : [];

    const driver = await this.driverRepository.findOne(id, {
      where: {
        active: true,
      },
      relations,
    });
    if (driver) {
      return driver;
    } else {
      this.logger.error('Error Getting driver', { id });
      throw new RpcException({
        message: `No existe un conductor con el id: ${id}`,
      });
    }
  }

  findByContractor(contractorId: number): Promise<DriverEntity[]> {
    this.logger.debug('Getting driver by contractor', { contractorId });
    return this.driverRepository.find({
      where: [{ active: true }, { contractorId }],
      relations: ['address'],
    });
  }

  async create(
    contractorId: number,
    driverDto: CreateDriverDto,
  ): Promise<DriverEntity> {
    this.logger.debug('Creating driver', { contractorId, driverDto });
    const contractor: ContractorEntity = await this.contractorsService.findOne(
      contractorId,
    );
    this.logger.debug(`Contractor ${contractorId} found`, { contractor });
    try {
      const driver: DriverEntity = driverDto;
      driver.contractor = contractor;
      return await this.driverRepository.save(driver);
    } catch (error) {
      this.logger.error('Error creating driver', { error });
      throw new RpcException({
        message: `Ya existe un conductor con el CUIT: ${driverDto.cuit}`,
      });
    }
  }

  async update(id: number, driverDto: UpdateDriverDto): Promise<DriverEntity> {
    this.logger.debug('Updating driver', { id });
    const driver: DriverEntity = await this.driverRepository.findOne(id, {
      where: {
        active: true,
      },
    });
    if (driver) {
      this.driverRepository.merge(driver, driverDto);
      try {
        return await this.driverRepository.save(driver);
      } catch (error) {
        this.logger.error('Error updating Driver', { error });
        throw new RpcException({
          message: `Ya existe un conductor con el cuit: ${driverDto.cuit}`,
        });
      }
    } else {
      this.logger.error('Error updating driver', { id });
      throw new RpcException({
        message: `No existe un conductor con el id: ${id}`,
      });
    }
  }
}
