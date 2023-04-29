import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _toggleButton: any;
  private _sidebarVisible: boolean;

  constructor(
    private _element: ElementRef,
    public location: Location,
    /*public auth: AuthService*/) {
    this._sidebarVisible = false;
  }


  ngOnInit() {
    const navbar: HTMLElement = this._element.nativeElement;
    this._toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  sidebarOpen() {
    const toggleButton = this._toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this._sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this._toggleButton.classList.remove('toggled');
    this._sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this._sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  isHome() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    if (titlee === '/home') {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    // this.auth.logout();
  }
}
