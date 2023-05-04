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
nx g @nx/nest:module app/__module__ --project=server

2. コントローラー作成
nx g @nx/nest:controller app/__controller__ --project=server

3. サービス作成
nx g @nx/nest:service app/__service__ --project=server

## ブログ作成

### 画像の埋め込み方法
![image](img-1.jpg)