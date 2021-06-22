import { PartialType, InputType, Field } from '@nestjs/graphql';
import { UpdateDriverInput } from 'src/driver/dto/update-driver.input';
import { CreateContractorInput } from './create-contractor.input';

@InputType()
export class UpdateContractorInput extends PartialType(CreateContractorInput) {
    @Field({nullable: true})
    name?: string;
  
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
