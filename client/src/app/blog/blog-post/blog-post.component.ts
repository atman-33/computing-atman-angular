import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrismService } from '../../shared/services/prism.service';
import { BlogService } from '../shared/blog.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as utils from 'libs/src/shared/utils/index';
import * as MarkdownIt from 'markdown-it';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit, AfterViewChecked {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public post: any;
  public postHtml: string | undefined;

  public title: string | undefined;
  public date: string | undefined;
  public thumbnail: string | undefined;
  public tags: string[] | undefined;
  public categories: string[] | undefined;

  private highlighted = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private prismService: PrismService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      const id = params.get('id') ?? '';

      const md = new MarkdownIt();
      utils.addMdPrefixToImageSource(md, './assets/posts/' + id + '/');

      // 観測対象を取得
      const blogObservable = this.blogService.getBlogById(params.get('id') ?? '');

      // subscribeでファイルからデータ取得
      blogObservable.subscribe({
        next: (data) => {
          this.post = data;

          this.title = data.title;
          console.log(this.title);

          this.date = data.date;
          this.thumbnail = data.thumbnail;
          this.tags = data.tags;
          this.categories = data.categories;

          const html = md.render(data.article);
          this.postHtml = utils.addClassToHtml(html, 'line-numbers', 'pre');
        },
        error: (err) => { console.error('Error: ' + err.error); }
      });
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngAfterViewInit() { }

  ngAfterViewChecked() {
    if (!this.highlighted && this.postHtml) {
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }
}
