import { Inject, Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ContractorEntity } from './contractor.entity';
import { ContractorSchema } from './contractor.schema';
import { ContractorsService } from './contractors.service';
import { CreateContractorInput } from './dto/create-contractor.input';

@Resolver((of) => ContractorSchema)
export class ContractorsResolver {
  constructor(
    @Inject(ContractorsService) private contractorService: ContractorsService,
  ) {}

  @Query((returns) => ContractorSchema)
  async contractor(@Args('uuid') uuid: string): Promise<ContractorEntity> {
    return await this.contractorService.findOne(uuid);
  }

  @Query((returns) => [ContractorSchema])
  async contractors(): Promise<ContractorEntity[]> {
    return await this.contractorService.findAll();
  }

  @Mutation((returns) => ContractorSchema)
  async createContractor(
    @Args() input: CreateContractorInput,
  ): Promise<ContractorSchema> {
    const contractorSchema: ContractorSchema =
      await this.contractorService.create(input);
    return contractorSchema;
  }
}
