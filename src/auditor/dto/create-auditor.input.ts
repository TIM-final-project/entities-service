import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateAuditorInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  cuit: string;

  @Field({ nullable: true })
  birth_date?: Date;
}
