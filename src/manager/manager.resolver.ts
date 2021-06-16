import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateManagerInput } from './dto/create-manager.input';
import { UpdateManagerInput } from './dto/update-manager.input';
import { ManagerSchema } from './manager.schema';
import { ManagerService } from './manager.service';

@Resolver((of) => ManagerSchema)
export class ManagerResolver {
  constructor(@Inject(ManagerService) private managerService: ManagerService) {}

  @Query((returns) => ManagerSchema)
  async manager(@Args('id') id: number): Promise<ManagerSchema> {
    return await this.managerService.findOne(id);
  }

  @Query((returns) => [ManagerSchema])
  async allManagers(): Promise<ManagerSchema[]> {
    return await this.managerService.findAll();
  }

  @Mutation((returns) => ManagerSchema)
  async createManager(
    @Args() input: CreateManagerInput,
  ): Promise<ManagerSchema> {
    const managerSchema: ManagerSchema = await this.managerService.create(
      input,
    );
    return managerSchema;
  }

  @Mutation((returns) => ManagerSchema)
  async updateManager(
    @Args('id') id: number,
    @Args('input') input: UpdateManagerInput,
  ): Promise<ManagerSchema> {
    return await this.managerService.update(id, input);
  }
}
