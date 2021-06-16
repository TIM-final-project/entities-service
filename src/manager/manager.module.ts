import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerResolver } from './manager.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity])
  ],
  providers: [ManagerService, ManagerResolver]
})
export class ManagerModule {}
