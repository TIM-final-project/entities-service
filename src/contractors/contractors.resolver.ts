import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ContractorSchema } from './contractor.schema';
import { ContractorsService } from './contractors.service';
import { CreateContractorInput } from './dto/create-contractor.input';
import { UpdateContractorInput } from './dto/update-contractor.input';

@Resolver((of) => ContractorSchema)
export class ContractorsResolver {
  constructor(
    @Inject(ContractorsService) private contractorService: ContractorsService,
  ) {}

  @Query((returns) => ContractorSchema)
  async contractor(@Args('uuid') uuid: string): Promise<ContractorSchema> {
    return await this.contractorService.findOne(uuid);
  }

  @Query((returns) => [ContractorSchema])
  async contractors(): Promise<ContractorSchema[]> {
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

  @Mutation((returns) => ContractorSchema)
  async updateContractor(
    @Args('uuid') uuid: string,
    @Args('input') input: UpdateContractorInput,
  ): Promise<ContractorSchema> {
    const contractorSchema: ContractorSchema =
      await this.contractorService.update(uuid, input);
    return contractorSchema;
  }
}
