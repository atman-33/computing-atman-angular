## 開発環境構築手順

1. nxインストール、プロジェクトをセットアップ
```
npm install -g nx
npx nx@latest init
```

2. nest フォルダを生成
```
npm install -D @nx/nest
nx generate @nx/nest:app server
```

3. angular フォルダを生成
```
npm install -D @nx/angular
nx generate @nx/angular:app client
```
- stylesheet => SCCS
- configure routing => true
- use Standalone Components => false 

4. libs フォルダを作成（必要に応じて適宜追加でOK）
```
  |- libs/
  |  |- shared/
  |  |  |- models/
  |  |  |- services/
  |  |  |- components/
  |  |  |- directives/
  |  |  |- ...
  |  |- core/
  |  |  |- guards/
  |  |  |- interceptors/
  |  |  |- services/
  |  |  |- ...
```

5. Angular CLI をインストール
```
npm install -g @angular/cli
```

## サーバー起動方法

### Angular 起動
```
nx serve client
```

### Nest 起動
```
nx serve server
```

## Bootstrap & テーマ適用

1. Bootstrapインストール
```
npm install bootstrap@5 --save
```

2. client/project.jsonにStyleを設定
```
        "styles": [
          "node_modules/bootstrap/dist/css/bootstrap.min.css",
          "client/src/styles.scss"
          ],
```

## フロントエンド（Angular）開発

### 1. ページ追加

1. コンポーネント（Page）作成
```
nx g @nx/angular:component __componet__ --project=client
```
2. app-routing.module.ts にページ登録
ページ単体の場合
- routes に path を追加

モジュールの場合
- @NgModule の imports に追加

## バックエンド（NestJS）開発

1. モジュール作成
nx g @nx/nest:module app/__name__ --project=server

2. コントローラー作成
nx g @nx/nest:controller app/__name__ --project=server

3. サービス作成
nx g @nx/nest:service app/__name__ --project=server

4. Docker（DB）構築
- 1. dockerをインストール
- 2. docker-compose.yamlを準備
- 3. docker-compose.yamlが存在するフォルダに移動
- 4. docker-compose up -d コマンドを実行
- 5. ブラウザ（http://localhost:81）でpgAdminにログインし、postgres サーバーを作成

5. マイグレーション

* マイグレーション作成
npx tsc server/src/app/**/*.entity.ts --outDir "./dist/server" --experimentalDecorators true --emitDecoratorMetadata
npx typeorm migration:generate -f server/ormconfig.js -n __name__  

* マイグレーション実行
npx tsc server/src/app/migrations/*.ts --outDir "./dist/server/migrations" --experimentalDecorators true --emitDecoratorMetadata  
npx typeorm migration:run -f server/ormconfig.js  
  ↓  
  ↓package.jsonのscriptsにコマンドを追加したため下記を利用可能  
  ↓  
**entitiesをbuildしてmigration:generate**
npm run typeorm-migration-generate __name__

**migrationsをbuildしてmigration:run**
npm run typeorm-migration-run

**dockerにアクセスするパーミッションがない場合、下記を実行!**
```
sudo su -
chmod -R 777 /home/atman/Sites/
exit
```

## ブログ作成

### 画像の埋め込み方法
![image](img-1.jpg)