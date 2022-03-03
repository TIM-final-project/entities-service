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
  @MessagePattern('securities_find_all')
  async findAll(): Promise<SecurityDto[]> {
    const securities: SecurityEntity[] = await this.securityService.findAll();
    return securities.map((security: SecurityEntity) => plainToInstance(SecurityDto, security ));
  }

  // @Get(':id')
  @MessagePattern('securities_find_by_id')
  async findOne(@Body('id') id: number): Promise<SecurityDto> {
    return plainToInstance(SecurityDto, this.securityService.findOne(id));
  }

  // @Post()
  @MessagePattern('securities_create')
  async create(@Body() security: CreateSecurityDto): Promise<SecurityDto> {
    return plainToInstance(SecurityDto, this.securityService.create(security));
  }

  // @Put(':id')
  @MessagePattern('securities_update')
  async update(
    updateDTO: {id: number, dto: UpdateSecurityDto },
  ): Promise<SecurityDto> {
    console.log('Update securiy request ', updateDTO.dto);
    return plainToInstance(SecurityDto, this.securityService.update(updateDTO.id, updateDTO.dto));
  }
}
