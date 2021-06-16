import { Module } from '@nestjs/common';
import { AuditorService } from './auditor.service';
import { AuditorResolver } from './auditor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditorEntity } from './auditor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditorEntity])
  ],
  providers: [AuditorService, AuditorResolver]
})
export class AuditorModule {}
