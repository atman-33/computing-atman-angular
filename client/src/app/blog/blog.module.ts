import { RouterModule, Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogPostComponent } from "./blog-post/blog-post.component";
import { CommonModule } from "@angular/common";
import { NgModule, SecurityContext  } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MarkdownModule } from "ngx-markdown";

const routes: Routes = [
    {
        path: 'blog', component: BlogComponent,
        children: [
            // htmlにrouter-outletを実装する事で、URL「***/blog」に BlogListComponent を表示 
            { path: '', component: BlogListComponent },

            // :*** で、変数を格納
            { path: ':article', component: BlogPostComponent }
        ]
    }
];

@NgModule({
    // 利用するコンポーネントを登録
    declarations: [
        BlogComponent,
        BlogListComponent,
        BlogPostComponent
    ],
    imports: [
        // RouterModuleのforRootはapp-routing.module.tsで利用。モジュールはforChildでルーター登録
        RouterModule.forChild(routes),
        // CommonModuleはngFor,ngIf等を利用する場合に必要
        CommonModule,
        // mdファイル読み込みに必要
        MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.NONE })
    ],
    providers: [
    ],
    bootstrap: []
})
export class BlogModule { }