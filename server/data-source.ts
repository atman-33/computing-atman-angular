/**
 * TypeORM用の設定ファイル
 */

import { DataSource, DataSourceOptions } from 'typeorm';
import { Item } from './src/app/_samples/postgresql-typeorm/entities/item.entity';
import { User } from './src/app/_samples/postgresql-typeorm/entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',

  /**
   * migrationファイル生成及びentityへのメタデータ設定ファイル
   * 注意: *.entity.ts/jsのファイル参照はエラーが発生するためクラスを指定
   */
  entities: [Item, User],

  /**
   * migrationファイルを生成するentityファイル 
   * 注意: ts参照だとモジュールでないためエラーが発生するのでトランスパイルしたjsを指定
   */
  migrations: ['dist/server/migrations/*.js'], 
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
