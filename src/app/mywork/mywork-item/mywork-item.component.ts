import { Component, Input, OnInit, ViewChild, NgZone, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { Language } from 'src/app/language-support'

@Component({
  selector: 'app-mywork-item',
  templateUrl: './mywork-item.component.html',
  styleUrls: ['./mywork-item.component.scss', './button.scss']
})
export class MyworkItemComponent implements OnInit {

  @Input() public work:any
  @ViewChild('myworkItem') myworkItem;

  monthStrs = {
    [Language.ENGLISH]:     ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    [Language.PORTUGUESE]:  ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  }

  public getI18NDate() {
    let date = new Date(this.work.date)
    return this.monthStrs[this.translate.currentLang][date.getMonth()] + " " + date.getFullYear()
  }

  constructor(public translate: TranslateService ) { }

  ngOnInit() {
    this.work.formattedDate = this.getI18NDate();
  }

}
