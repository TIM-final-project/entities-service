import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './driver.entity';
import { DriverResolver } from './driver.resolver';
import { DriverService } from './driver.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverEntity])
  ],
  providers: [DriverResolver, DriverService]
})
export class DriverModule {}
