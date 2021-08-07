import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ContractorSchema } from 'src/contractors/contractor.schema';

@ObjectType()
@Directive('@key(fields: "id")')
export class DriverSchema {
  @Field((type) => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  surname: string;

  @Field({ nullable: true })
  cuit: string;

  @Field({ nullable: true })
  birth_date?: Date;

  @Field(() => ContractorSchema, { nullable: true })
  contractor?: ContractorSchema;
}
