import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent {
  public isNavbarDialogOpen = false;

  // constructor(
  //   public auth: AuthService) {
  // }

  toggleNavbarDialog() {
    console.log('Toggle clicked!');
    this.isNavbarDialogOpen = !this.isNavbarDialogOpen;
  }

  closeNavbarDialog() {
    console.log('closeNavbarDialog!');
    this.isNavbarDialogOpen = false;
  }

  logout() {
    // this.auth.logout();
  }
}
