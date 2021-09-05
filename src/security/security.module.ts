import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityEntity } from './security.entity';
import { SecurityController } from './security.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SecurityEntity])
  ],
  providers: [SecurityService],
  controllers: [SecurityController]
})
export class SecurityModule {}
