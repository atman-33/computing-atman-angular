## デプロイ手順
### ビルド
nx build client --prod
nx build server --prod
nx build libs --prod
 ↓  
npm run build

### 起動
npm run start

**補足**
この起動でserverを起動する。
api以外のアクセスが届いた場合は、angular の index.htmlにアクセスを流す事で、
serverのみ起動すればフロントエンドとバックエンドが両方稼働した事となる。

### バンドルサイズ分析方法
nx run client:build:development --statsJson
npm run analyze  
=> ブラウザでバンドルサイズが高い部分を確認可能