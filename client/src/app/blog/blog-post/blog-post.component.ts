import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as MarkdownIt from 'markdown-it';
import { HighlightService } from '../../services/highlight.service'

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, AfterViewChecked {
  public postHtml: string | undefined;
  public title: string | undefined;
  public date: string | undefined;
  public tags: string | undefined;
  public categories: string | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _renderer: Renderer2,
    private _highlightService: HighlightService,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    const articleName = this._route.snapshot.paramMap.get('article');

    const md = new MarkdownIt();
    this.addPrefixToImageSrc(md, './assets/posts/' + articleName + '/');

    this._http.get('../../../assets/posts/' + articleName + '/index.md',
      { responseType: 'text' }).subscribe(data => {

        this.title = this.getMetadataValue(data, 'title:');
        this.date = this.getMetadataValue(data, 'date:');
        this.tags = this.getMetadataValue(data, 'tags:');
        this.categories = this.getMetadataValue(data, 'categories:');

        const html = md.render(this.getContent(data));
        this.postHtml = html;
        //html = this.addClassToHtml(html, 'prism', 'pre');
        //this.postHtml = this.addClassToHtml(html, 'prism', 'pre');

        // this.postHtml = this._highlightService.highlightHtml(html);
      });
  }

  ngAfterViewChecked() {
      this._highlightService.highlightAll();
  }

  /**
   * mdファイル内の画像に文字列を追加
   * @param md 
   * @param prefix 
   */
  addPrefixToImageSrc(md: MarkdownIt, prefix: string) {
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
      const imgToken = tokens[idx];
      const srcIndex = imgToken.attrIndex('src');
      if (imgToken.attrs !== null) {
        const srcValue = imgToken.attrs[srcIndex][1];
        const newSrcValue = prefix + srcValue;
        imgToken.attrs[srcIndex][1] = newSrcValue;
      }
      return self.renderToken(tokens, idx, options);
    };
  }

  /**
   * mdファイルのコンテンツデータを取得
   * @param str 
   * @returns 
   */
  getContent(str: string): string {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const content = str.slice(endIndex + 3).trim();

    return content;
  }

  /**
   * mdファイルのメタデータを取得
   * @param str 
   * @param key 
   * @returns 
   */
  getMetadataValue(str: string, key: string): string {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const metadata = str.slice(startIndex + 3, endIndex).trim();

    const keyStartIndex = metadata.indexOf(key);
    const keyEndIndex = metadata.indexOf('\n', keyStartIndex);
    const value = metadata.slice(keyStartIndex + key.length, keyEndIndex).trim();

    return value;
  }

  /**
   * htmlのタグにクラスを追加
   * @param html 
   * @param className 
   * @param tagName 
   * @returns 
   */
  addClassToHtml(html: string, className: string, tagName: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
      el.classList.add(className);
    });
    return doc.documentElement.innerHTML;
  }
}
