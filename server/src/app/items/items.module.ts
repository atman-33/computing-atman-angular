/**
 * ## 関連構造
 * module => controller => service(repository) => entity
 *           ^             ^          
 *           dto,guard     dto      
 * - module     : Repository, Controller, Serviceを登録
 * - controller : ルーティング機能を実装（path(URL)を設定）
 * - service    : ビジネスロジックを実装（ex. repository経由でDB操作）
 * - repository : DB操作 ※TypeORM ver0.3.Xの場合、serviceにrepositoryをDI
 * - entity     : DBのデータ定義
 */

import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Item } from '../entities/item.entity';

@Module({
  // Repository の登録は、一つの機能に閉じた設定のためforFeatureを使用
  // importsにAuthModuleを追加 => exportsに記載したprovidersを利用可能
  imports: [TypeOrmModule.forFeature([Item]), AuthModule],  
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
