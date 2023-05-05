import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey123', // JWT秘密鍵 ※外部に漏洩しないよう注意!
      signOptions: {
        expiresIn: 3600,      // JWT有効期限（単位:秒）
      }
    })
  ],
  controllers: [AuthController],
  // JwtStrategy, JwtAuthGuardはDIさせるため追加
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  // JwtStrategy, JwtAuthGuardはitems.module（外部モジュール）で利用するため追加
  exports: [JwtStrategy, JwtAuthGuard]
})
export class AuthModule { }
