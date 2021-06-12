import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityResolver } from './security.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityEntity } from './security.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SecurityEntity])
  ],
  providers: [SecurityService, SecurityResolver]
})
export class SecurityModule {}
