import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ContractorSchema {
    @Field()
    uuid?: string;

    @Field()
    name: string;
}