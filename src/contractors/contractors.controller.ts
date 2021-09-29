import { BadRequestException, Body, Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ContractorsService } from './contractors.service';
import { ContractorDto } from './dto/contractor.dto';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';

@Controller('contractors')
export class ContractorsController {
  private readonly logger = new Logger(ContractorsController.name);

  constructor(private contractorService: ContractorsService) {}

  // @Get()
  @MessagePattern('contractors_find_all')
  async findAll(): Promise<ContractorDto[]> {
    this.logger.log('Getting contractors');
    return this.contractorService.findAll();
  }

  // @Get(':id')
  @MessagePattern('contractors_find_by_id')
  async findOne(@Body('id') id: number): Promise<ContractorDto> {
    console.log('Get Contractor by id ', { id });    
    return this.contractorService.findOne(id);
  }

  // @Post()
  @MessagePattern('contractors_create')
  async create(
    @Body() createContractorDto: CreateContractorDto,
  ): Promise<ContractorDto> {
    this.logger.debug('Creating Contractor', { createContractorDto });
    try {
      return await this.contractorService.create(createContractorDto);
    } catch (error) {
      this.logger.error('Error Creating Contractor', { error });
      throw new BadRequestException('Error Creating Contractor');
    }
  }

  // @Put(':id')
  @MessagePattern('contractors_update')
  async update(
    @Body() updateContractorDto: UpdateContractorDto,
  ): Promise<ContractorDto> {
    this.logger.debug('Update contractor request ', { updateContractorDto });
    const { id } = updateContractorDto;
    delete updateContractorDto.id;
    return this.contractorService.update(id, updateContractorDto);
  }
}
