import { Module } from '@nestjs/common';
import { AuditorService } from './auditor.service';
import { AuditorResolver } from './auditor.resolver';

@Module({
  providers: [AuditorService, AuditorResolver]
})
export class AuditorModule {}
