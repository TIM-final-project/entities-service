import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateContractorInput {
  @Field()
  readonly name: string;
}
