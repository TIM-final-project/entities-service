import { PartialType, InputType } from '@nestjs/graphql';
import { CreateContractorInput } from './create-contractor.input';

@InputType()
export class UpdateContractorInput extends PartialType(CreateContractorInput) {}
