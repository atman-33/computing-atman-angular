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

### コンポーネント作成
```
nx g @nx/angular:component __my_componet__ --project=client
```