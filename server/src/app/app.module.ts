import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';

@Module({
  imports: [ 
    ItemsModule,
    TypeOrmModule.forRoot(ormconfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
