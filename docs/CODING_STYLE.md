# モノレポ開発におけるコーディングスタイル

この文書は、AngularとNestJSを使用してモノレポ開発を行う際に遵守すべきコーディングスタイルについて説明します。  
<br>   

## 命名規則
---

### プロジェクト名

プロジェクト名は、キャメルケースで記述する必要があります。たとえば、`myAwesomeProject`や`myProject`などです。  
<br> 

### クラス名

クラス名は、パスカルケースで記述する必要があります。たとえば、`MyClass`や`AwesomeService`などです。  
<br>

### ファイル名

ファイル名は、ケバブケースで記述する必要があります。たとえば、`my-class.ts`や`awesome-service.ts`などです。    
<br>

### プロパティ名とメソッド名
プロパティ名とメソッド名は、キャメルケースで記述する必要があります。たとえば、`myProperty`や`getMyProperty()`などです。  
<br>

### プライベート変数名
プライベート変数には_を使わない。  
`private lists: string[]`  
<br>

## コードフォーマット
---

### インデント
インデントには、スペース4つを使用する必要があります。  
<br>

### 改行
行の長さは、80文字を超えないようにする必要があります。行が長くなりそうな場合は、適切な位置で改行してください。  
<br>

### セミコロン
セミコロンを使用する必要があります。  
<br>

### シングルクォートとダブルクォート
シングルクォートを使用する必要があります。  
<br>

### インポート文
インポート文は、AngularとNestJSの両方で次のようにフォーマットする必要があります。  

typescriptCopy code

```typescript
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@Module({
  imports: [SharedModule, AppRoutingModule],
  controllers: [AppComponent],
})
export class AppModule {}
```
<br>

### HTMLテンプレート
HTMLテンプレートは、Angularのコンポーネントで使用する場合、以下のようにフォーマットする必要があります。  

html
```html
<app-header></app-header>

<div class="container">
  <h1>{{ title }}</h1>
  <p>{{ message }}</p>
</div>
```
<br>

### CSS/SCSSテンプレート
CSS/SCSSは、次のようにフォーマットする必要があります。  

scss  
`.my-class {   font-size: 14px;   color: #333; }`  
<br>

### コメント
*   単一行コメント: `// コメント`
*   複数行コメント: `/* コメント */`

Angular や NestJS ともに、単一行コメントと複数行コメントの両方が使えます。単一行コメントは、`//`から行末までをコメントアウトします。複数行コメントは、`/*`で始めて`*/`で終わるブロックをコメントアウトします。  
<br>
