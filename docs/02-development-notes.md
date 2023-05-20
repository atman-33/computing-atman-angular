## 開発環境構築手順

1. nxインストール、プロジェクトをセットアップ
```
npm install -g nx
npx nx@latest init
```

2. NestJS プロジェクトを生成
```
npm install -D @nx/nest
nx generate @nx/nest:app server
```

3. Angular プロジェクトを生成
```
npm install -D @nx/angular
nx generate @nx/angular:app client
```
- stylesheet => SCCS
- configure routing => true
- use Standalone Components => false 

Angular CLI をインストール
```
npm install -g @angular/cli
```

4. libs プロジェクトを作成

```
npx nx generate @nrwl/js:library libs --buildable
```

必要に応じて適宜追加
```
  |- libs/src/
  |  |- shared/
  |  |  |- utils/   : どこにでも自由に移動およびインポートできる静的クラス
  |  |  |- helpers/ : 別のクラスまたはモジュールを支援するクラス（ex. modulename-helper.ts）
```

*lintエラーが発生するため、ルートの.eslintrc.jsonに、"allow": ["libs/src/**"]を記載*
参考
```
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": ["libs/src/**"],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
```

-------------------------------------------------------------------------------
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