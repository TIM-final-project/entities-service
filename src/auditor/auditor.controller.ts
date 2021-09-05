import { Controller, Get } from '@nestjs/common';
import { AuditorService } from './auditor.service';
import { AuditorDto } from './dto/auditor.dto';

@Controller('auditors')
export class AuditorController {
  constructor(private auditorService: AuditorService) {}

  @Get()
  async findAll(): Promise<AuditorDto[]> {
    return await this.auditorService.findAll();
  }
}
