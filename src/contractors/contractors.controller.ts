import { Controller, Get } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorDto } from './dto/contractor.dto';

@Controller('contractors')
export class ContractorsController {
  constructor(private contractorService: ContractorsService) {}

  @Get()
  async findAll(): Promise<ContractorDto[]>{
    return this.contractorService.findAll();
  }
}
