import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, ResolveReference } from '@nestjs/graphql';
import { DriverSchema } from './driver.schema';
import { DriverService } from './driver.service';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@Resolver((of) => DriverSchema)
export class DriverResolver {
  constructor(@Inject(DriverService) private driverService: DriverService) {}

  @Query((returns) => DriverSchema)
  async driver(@Args('id') id: number): Promise<DriverSchema> {
    return await this.driverService.findOne(id);
  }

  @Query((returns) => [DriverSchema])
  async allDrivers(): Promise<DriverSchema[]> {
    return await this.driverService.findAll();
  }

  @Mutation((returns) => DriverSchema)
  async createDriver(
    @Args('contractorId') contractorId: number,
    @Args('input') input: CreateDriverInput
  ): Promise<DriverSchema> {
    const driverSchema: DriverSchema = await this.driverService.create(contractorId, input);
    return driverSchema;
  }

  @Mutation((returns) => DriverSchema)
  async updateDriver(
    @Args('id') id: number,
    @Args('input') input: UpdateDriverInput,
  ): Promise<DriverSchema> {
    return await this.driverService.update(id, input);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<DriverSchema> {
    return await this.driverService.findOne(reference.id);
  }
}
