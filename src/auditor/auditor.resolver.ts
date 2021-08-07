import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, ResolveReference } from '@nestjs/graphql';
import { AuditorSchema } from './auditor.schema';
import { AuditorService } from './auditor.service';
import { CreateAuditorInput } from './dto/create-auditor.input';
import { UpdateAuditorInput } from './dto/update-auditor.input';

@Resolver((of) => AuditorSchema)
export class AuditorResolver {
  constructor(@Inject(AuditorService) private auditorService: AuditorService) {}

  @Query((returns) => AuditorSchema)
  async auditor(@Args('id') id: number): Promise<AuditorSchema> {
    return await this.auditorService.findOne(id);
  }

  @Query((returns) => [AuditorSchema])
  async allAuditors(): Promise<AuditorSchema[]> {
    return await this.auditorService.findAll();
  }

  @Mutation((returns) => AuditorSchema)
  async createAuditor(
    @Args() input: CreateAuditorInput,
  ): Promise<AuditorSchema> {
    const auditorSchema: AuditorSchema = await this.auditorService.create(
      input,
    );
    return auditorSchema;
  }

  @Mutation((returns) => AuditorSchema)
  async updateAuditor(
    @Args('id') id: number,
    @Args('input') input: UpdateAuditorInput,
  ): Promise<AuditorSchema> {
    return await this.auditorService.update(id, input);
  }
  
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<AuditorSchema> {
    return await this.auditorService.findOne(reference.id);
  }
}
