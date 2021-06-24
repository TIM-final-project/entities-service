import { forwardRef, Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorsResolver } from './contractors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorEntity } from './contractor.entity';
import { DriverModule } from 'src/driver/driver.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractorEntity]),
    forwardRef(() => DriverModule),
    forwardRef(() => VehicleModule)
  ],
  providers: [ContractorsService, ContractorsResolver],
  exports: [ContractorsService]
})
export class ContractorsModule {}
