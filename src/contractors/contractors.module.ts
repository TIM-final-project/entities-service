import { forwardRef, Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorEntity } from './contractor.entity';
import { DriverModule } from 'src/driver/driver.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { ContractorsController } from './contractors.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractorEntity]),
    forwardRef(() => DriverModule),
    forwardRef(() => VehicleModule)
  ],
  providers: [ContractorsService],
  exports: [ContractorsService],
  controllers: [ContractorsController]
})
export class ContractorsModule {}
