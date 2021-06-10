import { Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorsResolver } from './contractors.resolver';

@Module({
  providers: [ContractorsService, ContractorsResolver]
})
export class ContractorsModule {}
