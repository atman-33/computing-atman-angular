/**
 * ## 関連構造
 * module => controller => service => repository => entity
 *           ^             ^          ^
 *           dto           dto        dto      
 * - module     : Repository, Controller, Serviceを登録
 * - controller : ルーティング機能を実装（path(URL)を設定）
 * - service    : ビジネスロジックを実装（ex. repository経由でDB操作）
 * - repository : DB操作
 * - entity     : DBのデータ定義
 */

import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './items.repository';

@Module({
  // Repository の登録は、一つの機能に閉じた設定のためforFeatureを使用
  imports: [TypeOrmModule.forFeature([ItemRepository])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
