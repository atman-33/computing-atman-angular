import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { ItemsModule } from './items/items.module';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../../data-source';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    // ItemsModule,
    // AuthModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    PostsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://atman:atman@ac-uczspzk-shard-00-00.jkfgop3.mongodb.net:27017,ac-uczspzk-shard-00-01.jkfgop3.mongodb.net:27017,ac-uczspzk-shard-00-02.jkfgop3.mongodb.net:27017/nest?ssl=true&replicaSet=atlas-nbs1wj-shard-0&authSource=admin&retryWrites=true&w=majority'
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
