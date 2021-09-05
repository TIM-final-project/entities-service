import { Controller, Get } from '@nestjs/common';
import { SecurityDto } from './dto/security.dto';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Get()
  async findAll(): Promise<SecurityDto[]> {
    return await this.securityService.findAll();
  }
}
