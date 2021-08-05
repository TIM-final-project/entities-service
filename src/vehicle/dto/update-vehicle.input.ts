import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateVehicleInput } from './create-vehicle.input';

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {
  @Field()
  plate: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  year: number;
}
