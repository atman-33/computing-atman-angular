/**
 * ## entity, migration, repository の流れ
 * 1. entityを作成
 * 2. entity.tsをトランスパイルしjsに変換
 * 3. migration:generate により、jsに変換したentityからmigrationファイルを生成
 * 4. migration.tsをトランスパイルしjsに変換
 * 5. migration:run により、jsに変換したmigrationからmigrationを実行（DB操作）
 * 6. repositoryを作成
 * 7. moduleのimportsに、repositoryを登録
 *    ex. imports: [TypeOrmModule.forFeature([ItemRepository])],
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ItemStatus } from '../items/item-status.enum';

@Entity({ name: 'item' })
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ItemStatus
      })
    status: ItemStatus;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;
}