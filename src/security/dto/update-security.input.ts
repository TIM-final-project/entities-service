import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSecurityInput } from "./create-security.input";


@InputType()
export class UpdateSecurityInput extends PartialType(CreateSecurityInput) {
    @Field({nullable: true})
    name?: string;
  
    @Field({nullable: true})
    surname?: string;
  
    @Field({nullable: true})
    cuit?: string;
  
    @Field({ nullable: true })
    birth_date?: Date;
}