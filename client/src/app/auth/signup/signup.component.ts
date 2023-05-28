import { Component } from '@angular/core';
import { UserRole } from 'libs/src/shared/enums/user-role.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  public userRoles: UserRole[] = [
    UserRole.MEMBER,
    UserRole.ADMINISTRATOR
  ];
  public defaultUserRoleId = 0;

}
