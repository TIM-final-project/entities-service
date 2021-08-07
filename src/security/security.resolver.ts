import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveReference } from '@nestjs/graphql';
import { CreateSecurityInput } from './dto/create-security.input';
import { UpdateSecurityInput } from './dto/update-security.input';
import { SecuritySchema } from './security.schema';
import { SecurityService } from './security.service';

@Resolver((of) => SecuritySchema)
export class SecurityResolver {
  constructor(
    @Inject(SecurityService) private securityService: SecurityService,
  ) {}

  @Query((returns) => SecuritySchema)
  async security(@Args('id') id: number): Promise<SecuritySchema> {
    return await this.securityService.findOne(id);
  }

  @Query((returns) => [SecuritySchema])
  async securities(): Promise<SecuritySchema[]> {
    return await this.securityService.findAll();
  }

  @Mutation((returns) => SecuritySchema)
  async createSecurity(
    @Args() input: CreateSecurityInput,
  ): Promise<SecuritySchema> {
    const securitySchema: SecuritySchema = await this.securityService.create(
      input,
    );
    return securitySchema;
  }

  @Mutation((returns) => SecuritySchema)
  async updateSecurity(
    @Args('id') id: number,
    @Args('input') input: UpdateSecurityInput,
  ): Promise<SecuritySchema> {
    return await this.securityService.update(id, input);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<SecuritySchema> {
    return await this.securityService.findOne(reference.id);
  }
}
