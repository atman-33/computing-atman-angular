import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightService } from '../../shared/services/highlight.service'
import * as MarkdownIt from 'markdown-it';
import * as Util from '../../shared/utils/util'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConsoleLogger } from '@nestjs/common';
//import { PrismService } from 'ngx-prism';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public postHtml: SafeHtml | undefined;
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
    private _elementRef: ElementRef,
    private _sanitizer: DomSanitizer) {

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

        let html = md.render(Util.getMdContent(data));
        //this.postHtml = html;
        //html = this.addClassToHtml(html, 'prism', 'pre');
        html = Util.addClassToHtml(html, 'line-numbers', 'pre');

        let test = '<div class="toolbar"><div class="toolbar-item"><span>Visual Basic</span></div><div class="toolbar-item"><button class="copy-to-clipboard-button" type="button" data-copy-state="copy"><span>Copy</span></button></div></div>'
        this.postHtml = this._sanitizer.bypassSecurityTrustHtml(Util.addTextAfterClosingTag(html, 'pre', test));
        
        //const escapedText = this._sanitizer.bypassSecurityTrustHtml(test);
        //const postHtmlWithText = Util.addTextAfterClosingTag(html, 'pre', escapedText.toString());
        //this.postHtml = this._sanitizer.bypassSecurityTrustHtml(postHtmlWithText);
        // console.log(escapedText);
        // console.log(escapedText.toString());        
        // console.log(Util.addTextAfterClosingTag(html, 'pre', test).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'));        



        // console.log(test);
        // const textNode = document.createTextNode(test);
        // console.log(textNode);
        
        // const test2 = test.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        // console.log(test2);

        // this.postHtml = this._sanitizer.bypassSecurityTrustHtml(Util.addTextAfterClosingTag(html, 'pre', test).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'));
        //console.log(this.postHtml);

        //console.log(this.postHtml.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'));


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
