import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ContractorSchema } from 'src/contractors/contractor.schema';

@ObjectType()
export class VehicleSchema {
  @Field((type) => ID, { nullable: true })
  id?: number;

  @Field()
  plate: string;

  @Field()
  model: string;

  @Field()
  brand: string;

  @Field()
  year: number;

  @Field(() => ContractorSchema, { nullable: true })
  contractor?: ContractorSchema;
}
