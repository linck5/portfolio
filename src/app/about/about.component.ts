import { Component, OnInit } from '@angular/core'
import { TextAnimatorService } from '../globalServices/textAnimator/text-animator.service'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private textAnimator:TextAnimatorService,
    private translate: TranslateService) { }



  ngOnInit() {


    let aboutTextElement = document.getElementById('aboutText')

    this.translate.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.textAnimator.animateText(lang.translations['About']['MainParagraph'], aboutTextElement)
    });

  }




}
