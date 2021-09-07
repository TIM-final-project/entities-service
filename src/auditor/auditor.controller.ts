import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuditorService } from './auditor.service';
import { AuditorDto } from './dto/auditor.dto';
import { CreateAuditorDto } from './dto/create-auditor.dto';
import { UpdateAuditorDto } from './dto/update-auditor.dto';

@Controller('auditors')
export class AuditorController {
  constructor(private auditorService: AuditorService) {}

  @Get()
  async findAll(): Promise<AuditorDto[]> {
    return await this.auditorService.findAll();
  }

  @Get(':id')
  async finOne(@Param('id') id: number): Promise<AuditorDto> {
    return await this.auditorService.findOne(id);
  }

  @Post()
  async create(@Body() auditor: CreateAuditorDto): Promise<AuditorDto> {
    return await this.auditorService.create(auditor);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() auditor: UpdateAuditorDto) {
    return await this.auditorService.update(id, auditor);
  }
}
