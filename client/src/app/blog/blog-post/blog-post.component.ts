import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrismService } from '../../shared/services/prism.service'
import { AssetsService } from '../../shared/services/assets.service';
import * as MarkdownIt from 'markdown-it';
import * as Util from '../../shared/utils/util'

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public postHtml: string | undefined;
  public title: string | undefined;
  public date: string | undefined;
  public tags: string | undefined;
  public categories: string | undefined;

  private highlighted = false;

  constructor(
    private route: ActivatedRoute,
    private assetsService: AssetsService,
    private prismService: PrismService) {
  }

  ngOnInit() {
    const articleName = this.route.snapshot.paramMap.get('article');

    const md = new MarkdownIt();
    Util.addMdPrefixToImageSource(md, './assets/posts/' + articleName + '/');

    // 観測対象を取得
    const fileObservable = this.assetsService.getFileContent(`../../../assets/posts/${articleName}/index.md`);

    // subscribeでファイルからデータ取得
    fileObservable.subscribe({
      next: (data) => {
        this.title = Util.getMetadataValue(data, 'title:');
        this.date = Util.getMetadataValue(data, 'date:');
        this.tags = Util.getMetadataValue(data, 'tags:');
        this.categories = Util.getMetadataValue(data, 'categories:');

        const html = md.render(Util.getMdContent(data));
        this.postHtml = Util.addClassToHtml(html, 'line-numbers', 'pre');
      },
      error: (err) => { console.error('Error: ' + err); }
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngAfterViewInit() { }

  ngAfterViewChecked() {
    if (!this.highlighted && this.postHtml) {
      //this.postHtml = this.addClassToHtml(this.postHtml, 'line-numbers', 'pre');
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }
}
