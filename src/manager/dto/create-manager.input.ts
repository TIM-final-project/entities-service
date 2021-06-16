import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateManagerInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  cuit: string;

  @Field({ nullable: true })
  birth_date?: Date;
}
