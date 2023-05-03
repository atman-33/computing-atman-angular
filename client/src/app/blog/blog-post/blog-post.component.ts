import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightService } from '../../shared/services/highlight.service'
import * as MarkdownIt from 'markdown-it';
import * as Util from '../../shared/utils/util'
//import { PrismService } from 'ngx-prism';

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

  private _highlighted = false;

  public sample: string | undefined;
  sampleHtml = '<pre class="line-numbers"><code class="language-visual-basic">var i = 1;\nvar j = 2;<code/><pre/>';

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _renderer: Renderer2,
    private _highlightService: HighlightService,
    private elementRef: ElementRef) {

    this.sample = this.sampleHtml;
  }

  ngOnInit(): void {
    const articleName = this._route.snapshot.paramMap.get('article');

    const md = new MarkdownIt();
    Util.addMdPrefixToImageSource(md, './assets/posts/' + articleName + '/');

    this._http.get('../../../assets/posts/' + articleName + '/index.md',
      { responseType: 'text' }).subscribe(data => {

        this.title = Util.getMetadataValue(data, 'title:');
        this.date = Util.getMetadataValue(data, 'date:');
        this.tags = Util.getMetadataValue(data, 'tags:');
        this.categories = Util.getMetadataValue(data, 'categories:');

        const html = md.render(Util.getMdContent(data));
        //this.postHtml = html;
        //html = this.addClassToHtml(html, 'prism', 'pre');
        this.postHtml = Util.addClassToHtml(html, 'line-numbers', 'pre');

        // this.postHtml = this._highlightService.highlightHtml(html);
      });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngAfterViewInit() {
    //this._highlightService.highlightAll();
  }

  ngAfterViewChecked() {
    if (!this._highlighted && this.postHtml) {
      //this.postHtml = this.addClassToHtml(this.postHtml, 'line-numbers', 'pre');
      this._highlightService.highlightAll();
      this._highlighted = true;
    }
    // this._highlightService.highlightAll();

    // if (!this._highlighted) {
    //   this._highlightService.highlightAll();
    //   this._highlighted = true;
    // }
  }
}
