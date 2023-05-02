import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  post: string | undefined;
  href: string | undefined;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const articleName = this._route.snapshot.paramMap.get('article');
    this.href = window.location.href;
    this.post = './assets/posts/' + articleName + '/index.md';
  }
}
