import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',

  entities: ['server/src/app/entities/*.entity.ts'],
  migrations: ['server/src/app/migrations/*.ts'],

  // entities: ['dist/server/**/*.entity.js'],     // migrationファイルを生成するentityファイル
  // migrations: ['dist/server/migrations/*.js'],  // migration実行用のファイル
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
