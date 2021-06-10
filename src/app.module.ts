import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractorsModule } from './contractors/contractors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmConfigService } from './config';

@Module({
  imports: [
    ContractorsModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
