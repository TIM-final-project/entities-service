import { Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorsResolver } from './contractors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorEntity } from './contractor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractorEntity])
  ],
  providers: [ContractorsService, ContractorsResolver]
})
export class ContractorsModule {}
