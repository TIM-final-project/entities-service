import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDriverInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  cuit: string;

  @Field({ nullable: true })
  birth_date?: Date;
}
