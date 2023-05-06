import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from '../../data-source';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot(dataSourceOptions), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
