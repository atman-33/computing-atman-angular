## 開発環境構築手順

1. nxインストール、プロジェクトをセットアップ
npm install -g nx
npx nx@latest init

2. nest フォルダを生成
npm install -D @nx/nest
nx generate @nx/nest:app server

3. angular フォルダを生成
npm install -D @nx/angular
nx generate @nx/angular:app client

Settings
- stylesheet => SCCS
- configure routing => true
- use Standalone Components => false 

4. libs フォルダを作成（必要に応じて適宜追加でOK）
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

5. Angular CLI をインストール
npm install -g @angular/cli

## サーバー起動方法

### Angular 起動
nx serve client

### Nest 起動
nx serve server