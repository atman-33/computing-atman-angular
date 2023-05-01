import { Component } from '@angular/core';
//import { ScriptLoaderService } from './services/script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Computing Atman';

  constructor(
    //private scriptLoaderService: ScriptLoaderService
    ) {
    //this.loadScript();
  }

  // async loadScript() {
  //   await this.scriptLoaderService.loadScript('../assets/js/neumorphism.js');
  //   console.log('Script loaded.');
  // }
}
