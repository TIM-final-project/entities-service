import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { VehicleSchema } from './vehicle.schema';
import { VehicleService } from './vehicle.service';

@Resolver()
export class VehicleResolver {
  constructor(@Inject(VehicleService) private vehicleService: VehicleService) {}

  @Query((returns) => VehicleSchema)
  async vehicle(@Args('id') id: number): Promise<VehicleSchema> {
    return await this.vehicleService.findOne(id);
  }

  @Query((returns) => [VehicleSchema])
  async allVehicles(): Promise<VehicleSchema[]> {
    return await this.vehicleService.findAll();
  }

  @Mutation((returns) => VehicleSchema)
  async createVehicle(
    @Args('contractorId') contractorId: number,
    @Args('input') input: CreateVehicleInput,
  ) {
    const vehicleSchema: VehicleSchema = await this.vehicleService.create(
      contractorId,
      input,
    );
    return vehicleSchema;
  }

  @Mutation((returns) => VehicleSchema)
  async updateVehicle(
    @Args('id') id: number,
    @Args('input') input: UpdateVehicleInput,
  ): Promise<VehicleSchema> {
    return await this.vehicleService.update(id, input);
  }
}
