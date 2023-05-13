import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {

  @Input()
  categories: string[] = [];
  @Input()
  tags: string[] = [];
  @Input()
  postTitle = '';

  @Output() resetPosts = new EventEmitter();

}
