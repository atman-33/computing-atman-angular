import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
// import { ItemsModule } from './items/items.module';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../../data-source';

@Module({
  imports: [
    // ItemsModule,
    // AuthModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
