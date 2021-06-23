import { forwardRef, Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorsResolver } from './contractors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorEntity } from './contractor.entity';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractorEntity]),
    forwardRef(() => DriverModule)
  ],
  providers: [ContractorsService, ContractorsResolver],
  exports: [ContractorsService]
})
export class ContractorsModule {}
