import { Module } from '@nestjs/common';
import { ShittyManagerService } from './shitty-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShittyManagerEntity } from './shitty-manager.entity';
import { ShittyManagerController } from './shitty-manager.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShittyManagerEntity])
  ],
  providers: [ShittyManagerService],
  controllers: [ShittyManagerController]
})
export class ShittyManagerModule {}
