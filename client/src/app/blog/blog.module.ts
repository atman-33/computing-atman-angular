import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrismService } from '../shared/services/prism.service';
import { PostService } from './shared/post.service';

const routes: Routes = [
    {
        path: 'blog', component: BlogComponent,
        children: [
            // htmlにrouter-outletを実装する事で、URL「***/blog」に BlogListComponent を表示 
            { path: '', component: PostListComponent },

            // :*** で、変数を格納
            { path: ':id', component: PostDetailComponent }
        ]
    }
];

@NgModule({
    // 利用するコンポーネントを登録
    declarations: [
        BlogComponent,
        PostListComponent,
        PostDetailComponent
    ],
    imports: [
        // RouterModuleのforRootはapp-routing.module.tsで利用。モジュールはforChildでルーター登録
        RouterModule.forChild(routes),
        // CommonModuleはngFor,ngIf等を利用する場合に必要
        CommonModule
    ],
    providers: [PrismService, PostService],
    bootstrap: []
})
export class BlogModule { }