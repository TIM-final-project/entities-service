import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateDriverInput } from './create-driver.input';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field({ nullable: true })
  cuit?: string;

  @Field({ nullable: true })
  birth_date?: Date;
}
