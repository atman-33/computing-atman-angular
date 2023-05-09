import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrismService } from '../../shared/services/prism.service';
import { PostService } from '../shared/post.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as utils from 'libs/src/shared/utils/index';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, AfterViewChecked {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public post: any;
  public articleHtml: string | undefined;

  public title: string | undefined;
  public date: string | undefined;
  public thumbnail: string | undefined;
  public tags: string[] | undefined;
  public categories: string[] | undefined;

  private highlighted = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private prismService: PrismService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      // const id = params.get('id') ?? '';

      // 観測対象を取得
      const postObservable$ = this.postService.getPostById(params.get('id') ?? '');

      // subscribeでファイルからデータ取得
      postObservable$.subscribe({
        next: (data) => {
          this.post = data;

          this.title = data.title;
          console.log(this.title);

          this.date = data.date;
          this.thumbnail = data.thumbnail;
          this.tags = data.tags;
          this.categories = data.categories;

          this.articleHtml = utils.addClassToHtml(data.article, 'line-numbers', 'pre');
        },
        error: (err) => { console.error('Error: ' + err.error); }
      });
    });
  }

  ngAfterViewChecked() {
    if (!this.highlighted && this.articleHtml) {
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }
}
