import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './manager.entity';
import { ManagerController } from './manager.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity])
  ],
  providers: [ManagerService],
  controllers: [ManagerController]
})
export class ManagerModule {}
