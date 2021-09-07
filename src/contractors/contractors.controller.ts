import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorDto } from './dto/contractor.dto';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

@Controller('contractors')
export class ContractorsController {
  constructor(private contractorService: ContractorsService) {}

  @Get()
  async findAll(): Promise<ContractorDto[]> {
    return this.contractorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContractorDto> {
    return this.contractorService.findOne(id);
  }

  @Post()
  async create(
    @Body() createContractorDto: CreateContractorDto,
  ): Promise<ContractorDto> {
    return this.contractorService.create(createContractorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContractorDto: UpdateContractorDto,
  ): Promise<ContractorDto> {
    return this.contractorService.update(id, updateContractorDto);
  }
}
