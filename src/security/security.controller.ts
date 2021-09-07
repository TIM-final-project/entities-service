import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSecurityDto } from './dto/create-security.dto';
import { SecurityDto } from './dto/security.dto';
import { UpdateSecurityDto } from './dto/update-security.dto';
import { SecurityService } from './security.service';

@Controller('securities')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Get()
  async findAll(): Promise<SecurityDto[]> {
    return await this.securityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SecurityDto> {
    return await this.securityService.findOne(id);
  }

  @Post()
  async create(@Body() security: CreateSecurityDto): Promise<SecurityDto> {
    return await this.securityService.create(security);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() security: UpdateSecurityDto): Promise<SecurityDto> {
    return await this.securityService.update(id, security);
  }
}
