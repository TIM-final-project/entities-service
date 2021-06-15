import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAuditorInput } from './create-auditor.input';

@InputType()
export class UpdateAuditorInput extends PartialType(CreateAuditorInput) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field({ nullable: true })
  cuit?: string;

  @Field({ nullable: true })
  birth_date?: Date;
}
