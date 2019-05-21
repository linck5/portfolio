import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if(this.translate.getDefaultLang() != "en"){
      console.error("unxpected default language, change this code")
    }

    this.toggleRadioCheckedById("en-coll")
    this.toggleRadioCheckedById("en-uncoll")
  }

  private toggleRadioCheckedById(id:string) {
    (document.getElementById(id) as HTMLInputElement).checked = true;
  }

  switchLanguage(event, language: string) {
    this.translate.use(language);

    switch(event.srcElement.id) {
      case "en-uncoll":
        this.toggleRadioCheckedById("en-coll");
        break;
      case "pt-uncoll":
        this.toggleRadioCheckedById("pt-coll");
        break;
      case "en-coll":
        this.toggleRadioCheckedById("en-uncoll");
        break;
      case "pt-coll":
        this.toggleRadioCheckedById("pt-uncoll");
        break;
    }
  }

}
