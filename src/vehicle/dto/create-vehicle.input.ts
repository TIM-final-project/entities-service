import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {
  @Field()
  plate: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  year: number;
}
