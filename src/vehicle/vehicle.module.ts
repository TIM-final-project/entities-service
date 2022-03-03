import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorsModule } from 'src/contractors/contractors.module';
import { VehicleEntity } from './vehicle.entity';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
    forwardRef(() => ContractorsModule),
  ],
  providers: [VehicleService],
  controllers: [VehicleController]
})
export class VehicleModule {}
