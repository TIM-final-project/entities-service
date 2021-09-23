import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuditorService } from './auditor.service';
import { AuditorDto } from './dto/auditor.dto';
import { CreateAuditorDto } from './dto/create-auditor.dto';
import { UpdateAuditorDto } from './dto/update-auditor.dto';

@Controller('auditors')
export class AuditorController {
  constructor(private auditorService: AuditorService) {}

  // @Get()
  @MessagePattern('auditors_find_all')
  async findAll(): Promise<AuditorDto[]> {
    return await this.auditorService.findAll();
  }

  // @Get(':id')
  @MessagePattern('auditors_find_by_id')
  async finOne(@Body('id') id: number): Promise<AuditorDto> {
    return await this.auditorService.findOne(id);
  }

  // @Post()
  @MessagePattern('auditors_create')
  async create(@Body() auditor: CreateAuditorDto): Promise<AuditorDto> {
    return await this.auditorService.create(auditor);
  }

  // @Put(':id')
  @MessagePattern('auditors_update')
  async update(@Body() auditor: UpdateAuditorDto) {
    console.log('Update auditor request ', { ...auditor });
    const { id } = auditor;
    delete auditor.id;
    return await this.auditorService.update(id, auditor);
  }
}
