import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
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
