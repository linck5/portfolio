import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import AOS from 'aos'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

       // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');


      AOS.init({
        duration: 400,
        offset: 150,
        easing: 'ease-out-sine',
        once: true
      })


  }
}
