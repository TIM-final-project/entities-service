import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { CreateSecurityDto } from './dto/create-security.dto';
import { SecurityDto } from './dto/security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { SecurityEntity } from './security.entity';
import { SecurityService } from './security.service';

@Controller('securities')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  // @Get()
  /* The `@MessagePattern('securities_find_all')` decorator is used to define a message pattern for a
  method in a NestJS controller. In this case, it is defining the message pattern for the `findAll`
  method in the `SecurityController` class. */
  @MessagePattern('securities_find_all')
  async findAll(): Promise<SecurityDto[]> {
    const securities: SecurityEntity[] = await this.securityService.findAll();
    return securities.map((security: SecurityEntity) => plainToInstance(SecurityDto, security ));
  }

  // @Get(':id')
  /* The `@MessagePattern('securities_find_by_id')` decorator is used to define a message pattern for
  the `findOne` method in the `SecurityController` class. This means that this method will be
  triggered when a message with the pattern `'securities_find_by_id'` is received. */
  @MessagePattern('securities_find_by_id')
  async findOne(@Body('id') id: number): Promise<SecurityDto> {
    return plainToInstance(SecurityDto, this.securityService.findOne(id));
  }

  // @Post()
  /* The `@MessagePattern('securities_create')` decorator is used to define a message pattern for the
  `create` method in the `SecurityController` class. This means that this method will be triggered
  when a message with the pattern `'securities_create'` is received. */
  @MessagePattern('securities_create')
  async create(@Body() security: CreateSecurityDto): Promise<SecurityDto> {
    return plainToInstance(SecurityDto, this.securityService.create(security));
  }

  // @Put(':id')
  /* The `@MessagePattern('securities_update')` decorator is used to define a message pattern for the
  `update` method in the `SecurityController` class. This means that this method will be triggered
  when a message with the pattern `'securities_update'` is received. */
  @MessagePattern('securities_update')
  async update(
    updateDTO: {id: number, dto: UpdateSecurityDto },
  ): Promise<SecurityDto> {
    console.log('Update securiy request ', updateDTO.dto);
    return plainToInstance(SecurityDto, this.securityService.update(updateDTO.id, updateDTO.dto));
  }
}
