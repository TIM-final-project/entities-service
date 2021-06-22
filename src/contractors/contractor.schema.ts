import { Field, ObjectType } from '@nestjs/graphql';
import { DriverSchema } from 'src/driver/driver.schema';

@ObjectType()
export class ContractorSchema {
  @Field({ nullable: true })
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
}
