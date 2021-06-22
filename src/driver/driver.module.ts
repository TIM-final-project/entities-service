import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractorsModule } from 'src/contractors/contractors.module';
import { DriverEntity } from './driver.entity';
import { DriverResolver } from './driver.resolver';
import { DriverService } from './driver.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverEntity]),
    forwardRef(() => ContractorsModule),
  ],
  providers: [DriverResolver, DriverService]
})
export class DriverModule {}
