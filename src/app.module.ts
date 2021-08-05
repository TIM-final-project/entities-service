import { Module } from '@nestjs/common';
import { ContractorsModule } from './contractors/contractors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmConfigService } from './config';
import { SecurityModule } from './security/security.module';
import { AuditorModule } from './auditor/auditor.module';
import { ManagerModule } from './manager/manager.module';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    ContractorsModule,
    SecurityModule,
    AuditorModule,
    ManagerModule,
    DriverModule,
    VehicleModule,
  ],
})
export class AppModule {}
