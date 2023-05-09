import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Post } from 'libs/src/shared/models/post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  public readonly defaultImagePath = '../../assets/img/keyboard.jpg';

  public posts: Post[] = [];

  constructor(
    private postService: PostService) {
  }

  ngOnInit() {

    // 観測対象を取得
    const postObservable$ = this.postService.getPosts();

    // subscribeでファイルからデータ取得
    postObservable$.subscribe({
      next: (data) => {
        this.posts = data;
        // console.log(this.posts);
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }
}
