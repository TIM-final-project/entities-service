import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerDto } from './dto/manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerService } from './manager.service';
import { ManagerQPs } from './dto/manager.qps';
import { plainToInstance } from 'class-transformer';

@Controller('managers')
export class ManagerController {
  private readonly logger = new Logger(ManagerController.name);

  constructor(private managerService: ManagerService) {}

  // @Get()
  /* The `@MessagePattern('managers_find_all')` decorator is used to define a message pattern for a
  method in a NestJS controller. In this case, it is used to define the message pattern for the
  `findAll` method in the `ManagerController` class. */
  @MessagePattern('managers_find_all')
  async findAll(managerQPs : ManagerQPs): Promise<ManagerDto[]> {
    this.logger.debug('Getting all managers', { managerQPs });
    const managers: ManagerDto[] = await this.managerService.findAll(
      managerQPs,
    );
    return managers.map((manager: ManagerDto) => plainToInstance(ManagerDto, manager));
  }

  // @Get(':id')
  /* The `@MessagePattern('managers_find_by_id')` decorator is used to define a message pattern for the
  `findOne` method in the `ManagerController` class. This means that when a message with the pattern
  `'managers_find_by_id'` is received by the controller, it will trigger the `findOne` method. */
  @MessagePattern('managers_find_by_id')
  async findOne(@Body('id') id: number): Promise<ManagerDto> {
    return this.managerService.findOne(id);
  }

  // @Post()
  /* The `@MessagePattern('managers_create')` decorator is used to define a message pattern for the
  `create` method in the `ManagerController` class. This means that when a message with the pattern
  `'managers_create'` is received by the controller, it will trigger the `create` method. */
  @MessagePattern('managers_create')
  async create(@Body() manager: CreateManagerDto): Promise<ManagerDto> {
    this.logger.debug('Creating manager', { manager });
    try {
      return await this.managerService.create(manager);
    } catch (error) {
      this.logger.error('Error Creating manager', { error });
      throw new RpcException({
        message: 'Ya existe un encargado con el CUIT ingresado.',
      });
    }
  }

  // @Put(':id')
  /* The `@MessagePattern('managers_update')` decorator is used to define a message pattern for the
  `update` method in the `ManagerController` class. This means that when a message with the pattern
  `'managers_update'` is received by the controller, it will trigger the `update` method. */
  @MessagePattern('managers_update')
  async update(
    updateDTO: {id: number, dto: UpdateManagerDto },
  ): Promise<ManagerDto> {
    console.log('Update manager request ', updateDTO.dto);
    return this.managerService.update(updateDTO.id, updateDTO.dto);
  }
}
