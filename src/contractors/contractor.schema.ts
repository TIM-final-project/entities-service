import { Field, ObjectType, ID, Directive} from '@nestjs/graphql';
import { DriverSchema } from 'src/driver/driver.schema';
import { VehicleSchema } from 'src/vehicle/vehicle.schema';

@ObjectType()
@Directive('@key(fields: "id")')
export class ContractorSchema {
  @Field((type) => ID, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  cuit?: string;

  @Field({ nullable: true })
  street_address?: string;

  @Field({ nullable: true })
  number_address?: number;

  @Field({ nullable: true })
  city_address?: string;

  @Field({ nullable: true })
  province_address?: string;

  @Field(() => [DriverSchema], { nullable: true })
  drivers?: DriverSchema[];

  @Field(() => [VehicleSchema], { nullable: true })
  vehicles?: VehicleSchema[];
}
