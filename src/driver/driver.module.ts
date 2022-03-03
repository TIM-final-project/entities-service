import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorsModule } from 'src/contractors/contractors.module';
import { DriverEntity } from './driver.entity';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverEntity]),
    forwardRef(() => ContractorsModule),
  ],
  providers: [DriverService],
  controllers: [DriverController]
})
export class DriverModule {}
