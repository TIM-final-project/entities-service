import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateSecurityDto } from './dto/create-security.dto';
import { SecurityDto } from './dto/security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { SecurityService } from './security.service';

@Controller('securities')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  // @Get()
  @MessagePattern('securities_find_all')
  async findAll(): Promise<SecurityDto[]> {
    return await this.securityService.findAll();
  }

  // @Get(':id')
  @MessagePattern('securities_find_by_id')
  async findOne(@Param('id') id: number): Promise<SecurityDto> {
    return await this.securityService.findOne(id);
  }

  // @Post()
  @MessagePattern('securities_create')
  async create(@Body() security: CreateSecurityDto): Promise<SecurityDto> {
    return await this.securityService.create(security);
  }

  // @Put(':id')
  @MessagePattern('securities_update')
  async update(@Param('id') id: number, @Body() security: UpdateSecurityDto): Promise<SecurityDto> {
    return await this.securityService.update(id, security);
  }
}
