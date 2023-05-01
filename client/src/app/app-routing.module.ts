import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopPageComponent } from './top-page/top-page.component';
//import { AuthModule } from './auth/auth.module';

/**
 * SPA用の画面遷移先（path）設定
 * @remark pathの先頭に/は不要（OK:detail NG:/detail）
 */
const routes: Routes = [
    { path: '', redirectTo: 'top-page', pathMatch: 'full' },
    { path: 'top-page', component: TopPageComponent }
];

/**
 * 子モジュールをimport
 */
@NgModule({
    declarations: [
        TopPageComponent
    ],
    imports: [
        RouterModule.forRoot(routes),

        // AuthModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
