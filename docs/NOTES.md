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
