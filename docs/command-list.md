## サーバー起動方法

### Angular 起動
```
nx serve client
nx serve client --proxy-config client/proxy.conf.json
```

### Nest 起動
```
nx serve server
```

-------------------------------------------------------------------------------
## フロントエンド（Angular）開発

### 1. 画面追加

1. コンポーネント作成
```
nx g @nx/angular:component __componet__ --project=client
```
2. app-routing.module.ts にページ登録
ページ単体の場合
- routes に path を追加

* モジュールの場合
- @NgModule の imports に追加

-------------------------------------------------------------------------------
## バックエンド（NestJS）開発

1. モジュール作成
nx g @nx/nest:module app/__name__ --project=server

2. コントローラー作成
nx g @nx/nest:controller app/__name__ --project=server

3. サービス作成
nx g @nx/nest:service app/__name__ --project=server

↓↓↓

#### モジュール、コントローラー、サービスを一度に生成
npm run create-nest-module-controller-service --name=__name__

4. Docker（DB）構築
- 1. dockerをインストール
- 2. docker-compose.yamlを準備
- 3. docker-compose.yamlが存在するフォルダに移動
- 4. docker-compose up -d コマンドを実行
- 5. ブラウザ（http://localhost:81）でpgAdminにログインし、postgres サーバーを作成

5. マイグレーション
**---- TypeORM ver0.3.X ----**

- 1. マイグレーションファイル生成
npx typeorm-ts-node-commonjs migration:generate -d server/data-source.ts server/src/app/migrations/__name__

- 2. マイグレーション実行
npx typeorm-ts-node-commonjs migration:run -d server/data-source.ts

↓↓↓

#### マイグレーションファイル生成（トランスパイル込み）
npm run migration:generate --name=__name__

#### マイグレーションファイル実行（トランスパイル込み）
npm run migration:run

**dockerにアクセスするパーミッションがない場合、下記を実行!**
```
sudo su -
chmod -R 777 /home/atman/Sites/
```

**FATAL: "could not open file global/pg_filenode.map": Permission denied の場合、下記を実行!**
pgAdminブラウザを閉じる
cd server
docker-compose stop
docker-compose up -d


6. Jest テスト実行  

テスト実行
nx test server

watchモードでテスト実行
nx test server --watch