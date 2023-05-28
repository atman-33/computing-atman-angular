# モノレポ開発におけるコーディングスタイル

この文書は、AngularとNestJSを使用してモノレポ開発を行う際に遵守すべきコーディングスタイルについて説明します。  
<br>   

## 命名規則
---

### 命名規則（共通）

#### プロジェクト名

プロジェクト名は、キャメルケースで記述する必要があります。たとえば、`myAwesomeProject`や`myProject`などです。  
<br> 

#### フォルダ名
フォルダ名は、小文字の複数形で記述する必要があります。たとえば、`interfaces`や`guards`などです。
*ただし、Angular のコンポーネント名フォルダは、上記の限りではない。*

#### クラス名

クラス名は、パスカルケースで記述する必要があります。たとえば、`MyClass`や`AwesomeService`などです。  
<br>

#### ファイル名

ファイル名は、ケバブケースで記述する必要があります。たとえば、`my-class.ts`や`awesome-service.ts`などです。    
<br>

#### プロパティ名とメソッド名
プロパティ名とメソッド名は、キャメルケースで記述する必要があります。たとえば、`myProperty`や`getMyProperty()`などです。  
<br>

#### プライベート変数名
プライベート変数には_を使わない。  
`private lists: string[]`  
<br>

### 命名規則（Angular）

#### コンポーネント名
単数形とする。  
ただし、複数形でのみ存在するものは複数形も可（ex. Breadcrumbs etc）
<br>

#### @Outputの名前
@Outputの名前は、適切な動詞+名詞の組み合わせ
- change（値が変更されたことを示す）
- update（値が更新されたことを示す）
- select（選択されたことを示す）
- delete（削除されたことを示す）
<br>

### 命名規則（NestJS）

#### コンポーネント名
APIに関するコンポーネントは複数形とする。
<br>

#### APIメソッド名
- データベースのエンティティを取得するためのメソッド名は「find」
- ただし、データベースから取得した内容についてキーワード検索を行ったデータを取得する際は「search」
- 画像を取得するためのメソッド名は「get」

## コードフォーマット
---

### インデント
インデントには、スペース2つを使用する必要があります。  
（VS codeの場合）
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
