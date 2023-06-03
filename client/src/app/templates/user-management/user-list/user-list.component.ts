import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'libs/src/shared/models/user.model';
import * as httpErrorHelper from '../../../shared/helpers/http-error-helper';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  errors: string[] = [];
  users: User[] = [];

  /**
   *
   */
  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err: HttpErrorResponse) => console.error(err)
    });
  }

  deleteUser(user: User) {

    this.userService.deleteUser(user.username).subscribe({
      next: () => {
        // 画面から削除
        const index = this.users.indexOf(user);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.errors = httpErrorHelper.handleErrorMessage(err);
      }
    });
  }
}
