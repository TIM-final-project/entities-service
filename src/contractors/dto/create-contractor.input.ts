import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateContractorInput {
  @Field()
  name: string;

  @Field()
  cuit: string;

  @Field({nullable: true})
  street_address?: string;

  @Field({nullable: true})
  number_address?: number;

  @Field({nullable: true})
  city_address?: string;

  @Field({nullable: true})
  province_address?: string;
}
