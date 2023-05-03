import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../shared/services/assets.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {

  public posts: string[] = [];

  constructor(
    private _assetsService: AssetsService) {
  }

  ngOnInit() {

    // 観測対象を取得
    const postFilesObservable = this._assetsService.getAssetFolders();

    // subscribeでファイルからデータ取得
    postFilesObservable.subscribe({
      next: (data) => {
        this.posts = data;
        console.log(this.posts);
      },
      error: (err) => { console.error('Error: ' + err); }
    });
  }
}
