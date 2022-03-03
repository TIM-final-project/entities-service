import { Module } from '@nestjs/common';
import { AuditorService } from './auditor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditorEntity } from './auditor.entity';
import { AuditorController } from './auditor.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditorEntity])
  ],
  providers: [AuditorService],
  controllers: [AuditorController]
})
export class AuditorModule {}
