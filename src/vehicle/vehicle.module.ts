import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorsModule } from 'src/contractors/contractors.module';
import { VehicleEntity } from './vehicle.entity';
import { VehicleResolver } from './vehicle.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
    forwardRef(() => ContractorsModule),
  ],
  providers: [VehicleResolver, VehicleService]
})
export class VehicleModule {}
