import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { ItemsModule } from './items/items.module';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../../data-source';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*']
    }),
    // ItemsModule,
    // AuthModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
