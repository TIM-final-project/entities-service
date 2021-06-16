import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateManagerInput } from './create-manager.input';

@InputType()
export class UpdateManagerInput extends PartialType(CreateManagerInput) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field({ nullable: true })
  cuit?: string;

  @Field({ nullable: true })
  birth_date?: Date;
}
