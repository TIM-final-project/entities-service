import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ManagerSchema {
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
}
