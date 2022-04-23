import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpeditorController } from './expeditor.controller';
import { ExpeditorEntity } from './expeditor.entity';
import { ExpeditorService } from './expeditor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpeditorEntity])
  ],
  providers: [ExpeditorService],
  controllers: [ExpeditorController]
})
export class ExpeditorModule {}
