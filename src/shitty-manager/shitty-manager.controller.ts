import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateShittyManagerDto } from './dto/create-shitty-manager.dto';
import { ShittyManagerDto } from './dto/shitty-manager.dto';
import { UpdateShittyManagerDto } from './dto/update-shitty-manager.dto';
import { ShittyManagerService } from './shitty-manager.service';
import { ShittyManagerQPs } from './dto/shitty-manager.qps';
import { ShittyManagerEntity } from './shitty-manager.entity';
import { plainToInstance } from 'class-transformer';

@Controller('shitty-managers')
export class ShittyManagerController {
  private readonly logger = new Logger(ShittyManagerController.name);

  constructor(private shittyManagerService: ShittyManagerService) {}

  // @Get()
  /* The `@MessagePattern('shittymanagers_find_all')` decorator is used to define a message pattern for
  a method in a NestJS controller. In this case, it is defining the message pattern for the
  `findAll` method in the `ShittyManagerController` class. */
  @MessagePattern('shittymanagers_find_all')
  async findAll(shittyManagerQPs : ShittyManagerQPs): Promise<ShittyManagerDto[]> {
    this.logger.debug('Getting all shitty managers', { shittyManagerQPs });
    const shittyManagers : ShittyManagerQPs[] = await this.shittyManagerService.findAll(      shittyManagerQPs    );
    return shittyManagers.map((shittyManager : ShittyManagerEntity) => plainToInstance(
      ShittyManagerDto,
      shittyManager,
    ))
  }

  // @Get(':id')
  /* The `@MessagePattern('shittymanagers_find_by_id')` decorator is used to define a message pattern
  for the `findOne` method in the `ShittyManagerController` class. This means that this method will
  be triggered when a message with the pattern `'shittymanagers_find_by_id'` is received by the
  controller. */
  @MessagePattern('shittymanagers_find_by_id')
  async findOne(@Body('id') id: number): Promise<ShittyManagerDto> {
    return this.shittyManagerService.findOne(id);
  }

  // @Post()
  /* The `@MessagePattern('shittymanagers_create')` decorator is used to define a message pattern for
  the `create` method in the `ShittyManagerController` class. This means that this method will be
  triggered when a message with the pattern `'shittymanagers_create'` is received by the controller. */
  @MessagePattern('shittymanagers_create')
  async create(
    @Body() manager: CreateShittyManagerDto,
  ): Promise<ShittyManagerDto> {
    this.logger.debug('Creating shitty manager', { manager });
    try {
      return await this.shittyManagerService.create(manager);
    } catch (error) {
      this.logger.error('Error Creating Shitty Manager', { error });
      throw new RpcException({
        message: 'Ya existe un encargado de area con el CUIT ingresado.',
      });
    }
  }

  // @Put(':id')
  /* The `@MessagePattern('shittymanagers_update')` decorator is used to define a message pattern for
  the `update` method in the `ShittyManagerController` class. This means that this method will be
  triggered when a message with the pattern `'shittymanagers_update'` is received by the controller. */
  @MessagePattern('shittymanagers_update')
  async update(updateDTO: {
    id: number;
    dto: UpdateShittyManagerDto;
  }): Promise<ShittyManagerDto> {
    console.log('Update shitty manager request ', updateDTO.dto);
    return this.shittyManagerService.update(updateDTO.id, updateDTO.dto);
  }
}
